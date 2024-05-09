'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ title, data }: { title: string; data: ChartData<'bar'> }) {
  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        ticks: {
          color: '#222222',
        },
      },
      y: {
        suggestedMin: 0,
        ticks: {
          stepSize: 1,
          color: '#222222',
        },
      },
    },
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

  return <Bar options={options} data={data} />;
}
