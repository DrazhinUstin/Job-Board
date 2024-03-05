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

export async function fetchJobs(
  filters: JobFilters,
  orderBy: Prisma.JobOrderByWithRelationInput = orderOptions[0].value
) {
  noStore();
  const { query, categoryName, type } = filters;
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
    AND: [query ? queryInput : {}, categoryName ? categoryNameInput : {}, type ? typeInput : {}],
  };
  try {
    const jobs = await prisma.job.findMany({
      where,
      orderBy,
    });
    return jobs;
  } catch (error) {
    console.error('Database Error:', error);
    throw Error('Failed to fetch jobs');
  }
}
