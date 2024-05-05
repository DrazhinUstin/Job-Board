import Image, { ImageProps } from 'next/image';
import logo from '@/public/logo.png';

type Props = Omit<ImageProps, 'src' | 'alt'>;

export default function Logo(props: Props) {
  return <Image {...props} src={logo} alt='logo' unoptimized />;
}
