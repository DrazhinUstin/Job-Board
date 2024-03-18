import { fetchCompanyById } from '@/app/lib/data';
import Image from 'next/image';

export default function CompanyDetails({
  name,
  logoUrl,
  location,
  description,
  websiteUrl,
  createdAt,
  jobsCount,
}: Exclude<Awaited<ReturnType<typeof fetchCompanyById>>, null>) {
  return (
    <section>
      <div>
        <Image src={logoUrl || ''} alt='company logo' width={100} height={100} />
        <h2>{name}</h2>
        <p>
          registered since: <span>{createdAt.toDateString()}</span>
        </p>
        {location && (
          <p>
            location: <span>{location}</span>
          </p>
        )}
        {websiteUrl && (
          <p>
            website:
            <a href={websiteUrl} target='_blank' rel='noopener noreferrer'>
              {name}
            </a>
          </p>
        )}
        <p>
          open jobs: <span>{jobsCount}</span>
        </p>
      </div>
      <div>
        <h3>About Company:</h3>
        <p>{description}</p>
      </div>
    </section>
  );
}
