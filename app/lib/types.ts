export type CreateJobFormState = {
  errorMsg?: string;
  fieldErrors?: {
    type?: string[];
    title?: string[];
    categoryName?: string[];
    location?: string[];
    salary?: string[];
    companyName?: string[];
    companyLogo?: string[];
    contactEmail?: string[];
    contactUrl?: string[];
    description?: string[];
  };
};

export type JobFilters = {
  query?: string;
  categoryName?: string;
  type?: string;
  userId?: string;
};

export type JobsPageSearchParams = Omit<JobFilters, 'userId'> & { orderBy?: string; page?: string };
