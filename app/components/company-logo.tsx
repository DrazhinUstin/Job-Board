import Image, { ImageProps } from 'next/image';
import default_logo from '@/public/default_company_logo.png';
import clsx from 'clsx';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src?: ImageProps['src'] | null;
  alt?: ImageProps['alt'];
};

export default function CompanyLogo({ src, alt, className, ...rest }: Props) {
  return (
    <Image
      {...rest}
      src={src || default_logo}
      alt={alt || 'company logo'}
      className={clsx('company-logo', className)}
    />
  );
}
