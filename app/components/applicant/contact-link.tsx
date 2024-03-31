import { Applicant } from '@prisma/client';

export default function ContactLink({
  contactEmail,
  contactUrl,
}: {
  contactEmail: Applicant['contactEmail'];
  contactUrl: Applicant['contactUrl'];
}) {
  const href = contactEmail ? `mailto:${contactEmail}` : contactUrl;
  return <a href={href as string}>contact</a>;
}
