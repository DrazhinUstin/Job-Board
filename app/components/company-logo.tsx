import Image, { ImageProps } from 'next/image';
import default_logo from '@/public/default_company_logo.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src?: ImageProps['src'] | null;
  alt?: ImageProps['alt'];
};

export default function CompanyLogo({ src, alt, ...rest }: Props) {
  return <Image {...rest} src={src || default_logo} alt={alt || 'company logo'} />;
}
