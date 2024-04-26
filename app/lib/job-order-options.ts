import { Prisma } from '@prisma/client';

export const orderOptions: {
  id: number;
  label: string;
  value: Prisma.JobOrderByWithRelationInput;
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
    label: 'Title (desc)',
    value: {
      title: 'desc',
    },
  },
  {
    id: 4,
    label: 'Title (asc)',
    value: {
      title: 'asc',
    },
  },
  {
    id: 5,
    label: 'Salary (desc)',
    value: {
      salary: 'desc',
    },
  },
  {
    id: 6,
    label: 'Salary (asc)',
    value: {
      salary: 'asc',
    },
  },
];
