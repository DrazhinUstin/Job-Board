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
];
