import Image, { ImageProps } from 'next/image';
import default_avatar from '@/public/default_avatar.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src?: ImageProps['src'] | null;
  alt?: ImageProps['alt'];
};

export default function Avatar({ src, alt, ...rest }: Props) {
  return <Image {...rest} src={src || default_avatar} alt={alt || 'avatar'} />;
}
