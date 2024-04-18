import Image, { ImageProps } from 'next/image';
import default_avatar from '@/public/default_avatar.png';
import clsx from 'clsx';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src?: ImageProps['src'] | null;
  alt?: ImageProps['alt'];
};

export default function Avatar({ src, alt, className, ...rest }: Props) {
  return (
    <Image
      {...rest}
      src={src || default_avatar}
      alt={alt || 'avatar'}
      className={clsx('avatar', className)}
    />
  );
}
