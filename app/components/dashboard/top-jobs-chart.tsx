import { auth } from '@/auth';
import { fetchUserTopJobs } from '@/app/lib/data';
import { ChartData } from 'chart.js';
import BarChart from '@/app/components/bar-chart';
import styles from './top-jobs-chart.module.scss';

export default async function TopJobsChart() {
  const user = (await auth())?.user;
  const { labels, data } = await fetchUserTopJobs(user?.id as string);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Applicants',
        data,
        backgroundColor: '#f64e4e',
        hoverBackgroundColor: '#e92020',
      },
    ],
  };

  return (
    <div className={styles.container}>
      <BarChart title='Top jobs by applicants' data={chartData} />
    </div>
  );
}
