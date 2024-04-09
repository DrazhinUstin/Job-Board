import authPick from '@/public/authentication.svg';
import profilePick from '@/public/profile_details.svg';
import selectPick from '@/public/select.svg';

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
