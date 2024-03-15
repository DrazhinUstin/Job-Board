import { prisma } from '@/client';
import { Prisma } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import type { JobFilters } from './types';
import { orderOptions } from './job-order-options';

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch categories');
  }
}

const jobsPerPage = 6;

export async function fetchJobs(
  filters: JobFilters,
  orderBy: Prisma.JobOrderByWithRelationInput = orderOptions[0].value,
  page: number = 1
) {
  noStore();
  const { query, categoryName, type, userId } = filters;
  const queryInput: Prisma.JobWhereInput = {
    OR: [
      {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        companyName: {
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
    ],
  };
  const skip = (page - 1) * jobsPerPage;
  try {
    const jobs = await prisma.job.findMany({
      where,
      orderBy,
      skip,
      take: jobsPerPage,
    });
    return jobs;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch jobs');
  }
}

export async function fetchJobsTotalPages(filters: JobFilters) {
  noStore();
  const { query, categoryName, type, userId } = filters;
  const queryInput: Prisma.JobWhereInput = {
    OR: [
      {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        companyName: {
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
  try {
    const count = await prisma.job.count({
      where: {
        AND: [
          query ? queryInput : {},
          categoryName ? { categoryName } : {},
          type ? { type } : {},
          userId ? { userId } : {},
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
    const job = await prisma.job.findUnique({ where: { id } });
    return job;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error(`Failed to fetch job with id: ${id}`);
  }
}

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
