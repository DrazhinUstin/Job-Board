import { z } from 'zod';
import { jobTypes } from './job-types';

const requiredString = z
  .string()
  .refine((val) => val.trim().length >= 1, { message: 'Required' })
  .refine((val) => val.length <= 200, { message: 'String cannot be longer than 200 characters' });

const LogoSchema = z
  .custom<File | undefined>()
  .transform((val) => (val?.type === 'application/octet-stream' && !val.size ? undefined : val))
  .refine((val) => !val || (val instanceof File && val.type.startsWith('image/')), {
    message: 'Only images are valid',
  })
  .refine((val) => !val || val.size <= 1024 * 1024 * 2, {
    message: 'The image size must be equal to or less than 2 MB.',
  });

const ContactsSchema = z
  .object({
    contactEmail: z.string().email().optional().or(z.literal('')),
    contactUrl: z.string().url().optional().or(z.literal('')),
  })
  .refine(({ contactEmail, contactUrl }) => contactEmail || contactUrl, {
    message: 'Either email or url must be added',
    path: ['contactEmail'],
  });

export const CreateJobFormSchema = z
  .object({
    categoryName: requiredString,
    title: requiredString,
    type: z.string().refine((val) => jobTypes.includes(val), { message: 'Invalid job type' }),
    location: z.string().max(200).optional(),
    salary: z.coerce
      .number()
      .gt(0, { message: 'Salary must be greater than 0' })
      .lt(1e6, { message: 'Salary must be less than 1000000' })
      .transform((val) => val * 100),
    companyName: requiredString,
    companyLogo: LogoSchema,
    description: z.string().max(1000).optional(),
  })
  .and(ContactsSchema);

export const CompanyFormSchema = z.object({
  name: requiredString,
  logo: LogoSchema,
  location: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
});
