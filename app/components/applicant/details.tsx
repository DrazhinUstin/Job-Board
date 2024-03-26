import { Applicant } from '@prisma/client';

export default function ApplicantDetails({ location, contactEmail, contactUrl, bio }: Applicant) {
  return (
    <div>
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
        {location && (
          <p>
            location: <span>{location}</span>
          </p>
        )}
      </div>
      <div>
        <h3>About me:</h3>
        <p>{bio}</p>
      </div>
    </div>
  );
}
