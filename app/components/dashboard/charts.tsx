import { auth } from '@/auth';
import { fetchUserJobsChartData, fetchUserCategoriesChartData } from '@/app/lib/data';
import { ChartData } from 'chart.js';
import BarChart from '@/app/components/bar-chart';
import PieChart from '@/app/components/pie-chart';
import styles from './charts.module.scss';

export default async function Charts() {
  const user = (await auth())?.user;
  const [jobsChartData, categoriesChartData] = await Promise.all([
    fetchUserJobsChartData(user?.id as string),
    fetchUserCategoriesChartData(user?.id as string),
  ]);

  const barChartData: ChartData<'bar'> = {
    labels: jobsChartData.labels,
    datasets: [
      {
        label: 'Applicants',
        data: jobsChartData.data,
        backgroundColor: '#f64e4e',
        hoverBackgroundColor: '#e92020',
      },
    ],
  };

  const pieChartData: ChartData<'pie'> = {
    labels: categoriesChartData.labels,
    datasets: [
      {
        label: 'Total jobs',
        data: categoriesChartData.data,
        backgroundColor: ['#f64e4e', '#4169e1', '#41e16e', '#41e1cc', '#ccc'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <div className={styles.chart_container}>
        <BarChart title='Top jobs by applicants' data={barChartData} />
      </div>
      <div className={styles.chart_container}>
        <PieChart title='Jobs categories' data={pieChartData} />
      </div>
    </div>
  );
}
