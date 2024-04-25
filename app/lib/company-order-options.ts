import { Prisma } from '@prisma/client';

export const orderOptions: {
  id: number;
  label: string;
  value: Prisma.CompanyOrderByWithRelationInput;
}[] = [
  {
    id: 1,
    label: 'Creation date (desc)',
    value: {
      createdAt: 'desc',
    },
  },
  {
    id: 2,
    label: 'Creation date (asc)',
    value: {
      createdAt: 'asc',
    },
  },
  {
    id: 3,
    label: 'Name (desc)',
    value: {
      name: 'desc',
    },
  },
  {
    id: 4,
    label: 'Name (asc)',
    value: {
      name: 'asc',
    },
  },
  {
    id: 5,
    label: 'Jobs count (desc)',
    value: {
      user: { jobs: { _count: 'desc' } },
    },
  },
  {
    id: 6,
    label: 'Jobs count (asc)',
    value: {
      user: { jobs: { _count: 'asc' } },
    },
  },
];
