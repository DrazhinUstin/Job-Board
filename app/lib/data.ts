import { prisma } from '@/client';
import { Prisma } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import type { JobFilters, CompanyFilters } from './types';
import { orderOptions } from './job-order-options';
import { orderOptions as companiesOrder } from './company-order-options';
import { cache } from 'react';

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch categories');
  }
}

export const jobsPerPage = 6;

export async function fetchJobs(
  filters: JobFilters,
  orderBy: Prisma.JobOrderByWithRelationInput = orderOptions[0].value,
  page: number = 1
) {
  noStore();
  const { query, categoryName, type, userId, companyId } = filters;
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
  const where: Prisma.JobWhereInput = {
    AND: [
      query ? queryInput : {},
      categoryName ? categoryNameInput : {},
      type ? typeInput : {},
      userId ? { userId } : {},
      companyId ? { user: { company: { id: companyId } } } : {},
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
  const { query, categoryName, type, userId, companyId } = filters;
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
  try {
    const count = await prisma.job.count({
      where: {
        AND: [
          query ? queryInput : {},
          categoryName ? { categoryName } : {},
          type ? { type } : {},
          userId ? { userId } : {},
          companyId ? { user: { company: { id: companyId } } } : {},
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
  const { query } = filters;
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
  const where: Prisma.CompanyWhereInput = { ...(query ? queryInput : {}) };
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
  const { query } = filters;
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
  try {
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        company: { select: { name: true, logoUrl: true } },
        jobs: {
          select: { title: true, salary: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: { select: { jobs: true } },
      },
    });
    if (!data) {
      throw Error('User was not found');
    }
    return { company: data.company, latestJob: data.jobs[0], totalJobs: data._count.jobs };
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch user overview');
  }
}
