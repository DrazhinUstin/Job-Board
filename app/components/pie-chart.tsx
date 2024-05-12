'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function PieChart({ title, data }: { title: string; data: ChartData<'pie'> }) {
  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#222222',
        },
      },
      title: {
        display: true,
        text: title,
        color: '#222222',
        font: {
          size: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return <Pie options={options} data={data} />;
}
