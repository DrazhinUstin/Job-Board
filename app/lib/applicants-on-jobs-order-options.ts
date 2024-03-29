import { Prisma } from '@prisma/client';

export const orderOptions: {
  id: number;
  label: string;
  value: Prisma.ApplicantsOnJobsOrderByWithRelationInput;
}[] = [
  { id: 1, label: 'Applied at (desc)', value: { appliedAt: 'desc' } },
  { id: 2, label: 'Applied at (asc)', value: { appliedAt: 'asc' } },
];
