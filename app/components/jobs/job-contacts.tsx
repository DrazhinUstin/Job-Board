import { Job } from '@prisma/client';
import { FaEnvelope, FaGlobe } from 'react-icons/fa6';

export default function JobContacts({
  contactEmail,
  contactUrl,
}: {
  contactEmail: Job['contactEmail'];
  contactUrl: Job['contactUrl'];
}) {
  const href = contactEmail ? `mailto:${contactEmail}` : contactUrl;
  return (
    <a href={href as string} className='btn-flex btn-alt'>
      {contactEmail ? <FaEnvelope /> : <FaGlobe />}contact
    </a>
  );
}
