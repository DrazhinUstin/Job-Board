import authPick from '@/public/authentication.svg';
import profilePick from '@/public/profile_details.svg';
import selectPick from '@/public/select.svg';
import postPick from '@/public/post.svg';
import managePick from '@/public/manage.svg';

export const applicantSteps = [
  {
    title: 'Register an account',
    description: 'Sign in with one of the available providers on the authentication page',
  },
  {
    title: 'Create an applicant profile',
    description:
      'You may create an applicant profile with information about yourself and your experience. Your applicant profile will be visible to the employer after you apply for a job you want.',
  },
  {
    title: 'Apply for a job',
    description:
      'Find the job you want and apply for it. The employer will see your application and contact you if they are interested in you. Or you can contact the employer by yourself if they provide their contacts on the job page',
  },
];

export const applicantStepsImages = [authPick, profilePick, selectPick];

export const employerSteps = [
  {
    title: 'Register an account',
    description: 'Sign in with one of the available providers on the authentication page',
  },
  {
    title: 'Post a job',
    description:
      'Visit dashboard page and post a job using special form. You can also create a company profile if you want to bound all your posted jobs to a specific company',
  },
  {
    title: 'Manage applicants on job',
    description:
      'On the dashboard you can manage all your posted jobs and applicants for them. After a person applies for a job you have posted, you will see them in your applicants list. Choose the most suitable applicant and contact them',
  },
];

export const employerStepsImages = [authPick, postPick, managePick];
