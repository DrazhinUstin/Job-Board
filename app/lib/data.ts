import { prisma } from '@/client';
import { Prisma } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import type { JobFilters, CompanyFilters, ApplicantsOnJobsFilters } from './types';
import { orderOptions } from './job-order-options';
import { orderOptions as companiesOrder } from './company-order-options';
import { orderOptions as applicantsOnJobsOrder } from './applicants-on-jobs-order-options';
import { cache } from 'react';

export async function fetchUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user');
  }
}

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch categories');
  }
}

export async function fetchCategoriesWithJobsCount() {
  try {
    const categories = (
      await prisma.category.findMany({
        include: { _count: { select: { jobs: true } } },
        orderBy: { name: 'asc' },
      })
    ).map(({ _count, ...category }) => ({ ...category, jobsCount: _count.jobs }));
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch categories with jobs count');
  }
}

export const jobsPerPage = 6;

export async function fetchJobs(
  filters: JobFilters,
  orderBy: Prisma.JobOrderByWithRelationInput = orderOptions[0].value,
  page: number = 1
) {
  noStore();
  const { query, categoryName, type, minSalary, maxSalary, userId, companyId, applicantUserId } =
    filters;
  const queryInput: Prisma.JobWhereInput = {
    OR: [
      {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        location: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        user: { company: { name: { contains: query, mode: 'insensitive' } } },
      },
    ],
  };
  const categoryNameInput: Prisma.JobWhereInput = {
    categoryName: { equals: categoryName },
  };
  const typeInput: Prisma.JobWhereInput = {
    type: {
      equals: type,
    },
  };
  const minSalaryInput: Prisma.JobWhereInput = {
    salary: { gte: minSalary },
  };
  const maxSalaryInput: Prisma.JobWhereInput = {
    salary: { lte: maxSalary },
  };
  const where: Prisma.JobWhereInput = {
    AND: [
      query ? queryInput : {},
      categoryName ? categoryNameInput : {},
      type ? typeInput : {},
      minSalary ? minSalaryInput : {},
      maxSalary ? maxSalaryInput : {},
      userId ? { userId } : {},
      companyId ? { user: { company: { id: companyId } } } : {},
      applicantUserId ? { applicants: { some: { applicant: { userId: applicantUserId } } } } : {},
    ],
  };
  const skip = (page - 1) * jobsPerPage;
  try {
    const jobs = (
      await prisma.job.findMany({
        where,
        select: {
          id: true,
          userId: true,
          title: true,
          categoryName: true,
          type: true,
          location: true,
          salary: true,
          user: { select: { company: { select: { name: true, logoUrl: true } } } },
        },
        orderBy,
        skip,
        take: jobsPerPage,
      })
    ).map(({ user: { company }, ...job }) => ({ ...job, company }));
    return jobs;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch jobs');
  }
}

export async function fetchJobsTotalPages(filters: JobFilters) {
  noStore();
  const { query, categoryName, type, minSalary, maxSalary, userId, companyId, applicantUserId } =
    filters;
  const queryInput: Prisma.JobWhereInput = {
    OR: [
      {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        location: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        user: { company: { name: { contains: query, mode: 'insensitive' } } },
      },
    ],
  };
  const minSalaryInput: Prisma.JobWhereInput = {
    salary: { gte: minSalary },
  };
  const maxSalaryInput: Prisma.JobWhereInput = {
    salary: { lte: maxSalary },
  };
  try {
    const count = await prisma.job.count({
      where: {
        AND: [
          query ? queryInput : {},
          categoryName ? { categoryName } : {},
          type ? { type } : {},
          minSalary ? minSalaryInput : {},
          maxSalary ? maxSalaryInput : {},
          userId ? { userId } : {},
          companyId ? { user: { company: { id: companyId } } } : {},
          applicantUserId
            ? { applicants: { some: { applicant: { userId: applicantUserId } } } }
            : {},
        ],
      },
    });
    return Math.ceil(count / jobsPerPage);
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch jobs count');
  }
}

export async function fetchJobById(id: string) {
  try {
    const data = await prisma.job.findUnique({
      where: { id },
      include: {
        user: { select: { company: { select: { id: true, name: true, logoUrl: true } } } },
      },
    });
    if (data) {
      const {
        user: { company },
        ...job
      } = data;
      return { ...job, company };
    }
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error(`Failed to fetch job with id: ${id}`);
  }
}

export const cachedFetchJobById = cache(fetchJobById);

export const companiesPerPage = 6;

export async function fetchCompanies(
  filters: CompanyFilters,
  orderBy: Prisma.CompanyOrderByWithRelationInput = companiesOrder[0].value,
  page: number = 1
) {
  noStore();
  const { query, withPostedJobs } = filters;
  const queryInput: Prisma.CompanyWhereInput = {
    OR: [
      {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        location: {
          contains: query,
          mode: 'insensitive',
        },
      },
    ],
  };
  const where: Prisma.CompanyWhereInput = {
    ...(query ? queryInput : {}),
    ...(withPostedJobs === 'true' ? { user: { jobs: { some: {} } } } : {}),
  };
  const skip = (page - 1) * companiesPerPage;
  try {
    const companies = (
      await prisma.company.findMany({
        where,
        select: {
          id: true,
          name: true,
          logoUrl: true,
          location: true,
          user: {
            select: {
              _count: { select: { jobs: true } },
            },
          },
        },
        orderBy,
        skip,
        take: companiesPerPage,
      })
    ).map(({ user, ...rest }) => ({ ...rest, jobsCount: user._count.jobs }));
    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch companies');
  }
}

export async function fetchCompaniesTotalPages(filters: CompanyFilters) {
  noStore();
  const { query, withPostedJobs } = filters;
  const queryInput: Prisma.CompanyWhereInput = {
    OR: [
      {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        location: {
          contains: query,
          mode: 'insensitive',
        },
      },
    ],
  };
  const where: Prisma.CompanyWhereInput = {
    ...(query ? queryInput : {}),
    ...(withPostedJobs === 'true' ? { user: { jobs: { some: {} } } } : {}),
  };
  try {
    const count = await prisma.company.count({
      where,
    });
    return Math.ceil(count / companiesPerPage);
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch companies count');
  }
}

export async function fetchCompanyById(id: string) {
  try {
    const data = await prisma.company.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            _count: {
              select: {
                jobs: true,
              },
            },
          },
        },
      },
    });
    if (data) {
      const {
        user: {
          _count: { jobs: jobsCount },
        },
        ...company
      } = data;
      return { ...company, jobsCount };
    }
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch company');
  }
}

export const cachedFetchCompanyById = cache(fetchCompanyById);

export async function fetchUserCompany(userId: string) {
  try {
    const company = await prisma.company.findUnique({ where: { userId } });
    return company;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch company');
  }
}

export async function fetchUserOverview(userId: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        company: { select: { id: true, name: true, logoUrl: true } },
        jobs: {
          select: { _count: { select: { applicants: true } } },
        },
        _count: { select: { jobs: true } },
      },
    });
    if (!data) {
      throw Error('User was not found');
    }
    return {
      company: data.company,
      totalApplicants: data.jobs.reduce((acc, { _count }) => acc + _count.applicants, 0),
      totalJobs: data._count.jobs,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user overview');
  }
}

export async function fetchUserJobsChartData(userId: string) {
  noStore();
  try {
    const data = await prisma.job.findMany({
      where: { userId },
      select: { title: true, _count: { select: { applicants: true } } },
      orderBy: { applicants: { _count: 'desc' } },
      take: 5,
    });
    return data.reduce(
      (acc, { title, _count }) => ({
        labels: [...acc.labels, title],
        data: [...acc.data, _count.applicants],
      }),
      { labels: [] as string[], data: [] as number[] }
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user top jobs');
  }
}

export async function fetchUserCategoriesChartData(userId: string) {
  noStore();
  try {
    const data = (
      await prisma.category.findMany({
        where: { jobs: { some: { userId } } },
        select: { name: true, _count: { select: { jobs: { where: { userId } } } } },
      })
    )
      .sort((a, b) => b._count.jobs - a._count.jobs)
      .reduce((acc, { name, _count: { jobs: jobsCount } }, index) => {
        if (index > 3) {
          acc['Others'] = (acc['Others'] || 0) + jobsCount;
        } else {
          acc[name] = jobsCount;
        }
        return acc;
      }, {} as { [index: string]: number });
    return { labels: Object.keys(data), data: Object.values(data) };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user categories chart data');
  }
}

export const applicantsOnJobsPerPage = 6;

export async function fetchApplicantsOnJobs(
  filters: ApplicantsOnJobsFilters,
  orderBy: Prisma.ApplicantsOnJobsOrderByWithRelationInput = applicantsOnJobsOrder[0].value,
  page: number = 1
) {
  noStore();
  const { userId } = filters;
  const where: Prisma.ApplicantsOnJobsWhereInput = {
    job: { userId },
  };
  const skip = (page - 1) * applicantsOnJobsPerPage;
  try {
    const data = await prisma.applicantsOnJobs.findMany({
      where,
      select: {
        appliedAt: true,
        applicant: {
          select: {
            id: true,
            fullName: true,
            photoUrl: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy,
      skip,
      take: applicantsOnJobsPerPage,
    });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch applicants on jobs');
  }
}

export async function fetchApplicantsOnJobsTotalPages(filters: ApplicantsOnJobsFilters) {
  noStore();
  const { userId } = filters;
  const where: Prisma.ApplicantsOnJobsWhereInput = {
    job: { userId },
  };
  try {
    const count = await prisma.applicantsOnJobs.count({ where });
    return Math.ceil(count / applicantsOnJobsPerPage);
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch applicants on jobs count');
  }
}

export async function fetchApplicantById(id: string) {
  try {
    const applicant = await prisma.applicant.findUnique({ where: { id } });
    return applicant;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch applicant');
  }
}

export const cachedFetchApplicantById = cache(fetchApplicantById);

export async function fetchApplicant(userId: string) {
  try {
    const applicant = await prisma.applicant.findUnique({ where: { userId: userId } });
    return applicant;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch applicant');
  }
}

export const cachedFetchApplicant = cache(fetchApplicant);
