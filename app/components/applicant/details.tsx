import { Applicant } from '@prisma/client';

export default function ApplicantDetails({
  fullName,
  location,
  contactEmail,
  contactUrl,
  githubUrl,
  linkedinUrl,
  bio,
}: Applicant) {
  return (
    <main>
      <div>
        <h4>{fullName}</h4>
        <p>
          {linkedinUrl && (
            <a href={linkedinUrl} target='_blank' rel='noopener noreferrer'>
              linkedin
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
              github
            </a>
          )}
        </p>
        <p>
          location: <span>{location}</span>
        </p>
      </div>
      <div>
        <h3>contacts:</h3>
        {contactEmail && (
          <p>
            email: <span>{contactEmail}</span>
          </p>
        )}
        {contactUrl && (
          <p>
            website: <span>{contactUrl}</span>
          </p>
        )}
      </div>
      <div>
        <h3>About me:</h3>
        <p>{bio}</p>
      </div>
    </main>
  );
}
