import { Applicant } from '@prisma/client';
import { FaEnvelope, FaGlobe } from 'react-icons/fa6';

export default function ContactLink({
  contactEmail,
  contactUrl,
}: {
  contactEmail: Applicant['contactEmail'];
  contactUrl: Applicant['contactUrl'];
}) {
  const href = contactEmail ? `mailto:${contactEmail}` : contactUrl;
  return (
    <a href={href as string} className='btn-flex w-100'>
      {contactEmail ? <FaEnvelope /> : <FaGlobe />}contact
    </a>
  );
}
