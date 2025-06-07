import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { ThemeContext } from '../context/ThemeContext';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

  // Colors change based on theme
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: darkMode ? 'rgba(147,197,253,0.7)' : 'rgba(37,99,235,0.7)', // lighter blue in dark mode
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#e0e0e0' : '#1f2937', // light text for dark mode, dark text for light mode
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Overview',
        color: darkMode ? '#e0e0e0' : '#111827', // title color changes by theme
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#d1d5db' : '#374151', // axis ticks color by theme
        },
        grid: {
          color: darkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.3)',
        },
      },
      y: {
        ticks: {
          color: darkMode ? '#d1d5db' : '#374151',
        },
        grid: {
          color: darkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.3)',
        },
      },
    },
  };

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <Bar data={barChartData} options={barChartOptions} />
    </div>
  );
};

export default Dashboard;
