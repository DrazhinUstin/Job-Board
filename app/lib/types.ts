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
