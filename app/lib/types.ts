export type CreateJobFormState = {
  errorMsg?: string;
  fieldErrors?: {
    type?: string[];
    title?: string[];
    categoryName?: string[];
    location?: string[];
    salary?: string[];
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
  companyId?: string;
};

export type JobsPageSearchParams = Omit<JobFilters, 'userId' | 'companyId'> & {
  orderBy?: string;
  page?: string;
};

export type CompanyFormState = {
  errorMsg?: string;
  fieldErrors?: {
    name?: string[];
    logo?: string[];
    location?: string[];
    description?: string[];
    websiteUrl?: string[];
  };
};

export type CompanyFilters = {
  query?: string;
};

export type CompaniesPageSearchParams = CompanyFilters & { orderBy?: string; page?: string };
