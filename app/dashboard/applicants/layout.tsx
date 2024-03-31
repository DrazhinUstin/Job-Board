import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Applicants',
    default: 'Applicants',
  },
};

export default function Layout({
  children,
  applicant,
}: {
  children: React.ReactNode;
  applicant: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {applicant}
    </div>
  );
}
