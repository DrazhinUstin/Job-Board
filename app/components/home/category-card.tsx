import { Prisma } from '@prisma/client';
import { fetchCategoriesWithJobsCount } from '@/app/lib/data';
import styles from './categories.module.scss';
import {
  FaGuitar,
  FaMoneyBillTrendUp,
  FaPhoneVolume,
  FaBuildingColumns,
  FaHouseMedical,
  FaMugHot,
  FaComputer,
  FaShieldHalved,
  FaMoneyCheckDollar,
  FaMicroscope,
  FaBus,
} from 'react-icons/fa6';

const icons = [
  { name: 'art', icon: <FaGuitar /> },
  { name: 'business', icon: <FaMoneyBillTrendUp /> },
  { name: 'communication', icon: <FaPhoneVolume /> },
  { name: 'education', icon: <FaBuildingColumns /> },
  { name: 'health', icon: <FaHouseMedical /> },
  { name: 'hospitality', icon: <FaMugHot /> },
  { name: 'information technology', icon: <FaComputer /> },
  { name: 'law', icon: <FaShieldHalved /> },
  { name: 'marketing', icon: <FaMoneyCheckDollar /> },
  { name: 'science', icon: <FaMicroscope /> },
  { name: 'transportation', icon: <FaBus /> },
];

export default function CategoryCard({
  name,
  jobsCount,
}: Prisma.PromiseReturnType<typeof fetchCategoriesWithJobsCount>[0]) {
  const icon = icons.find((icon) => name.toLowerCase().includes(icon.name));
  return (
    <article className={styles.card}>
      <span>{icon?.icon || <FaComputer />}</span>
      <h4>{name}</h4>
      <p>{jobsCount} Jobs</p>
    </article>
  );
}
