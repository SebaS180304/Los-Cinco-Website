import React from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { quiz_data } from './constants';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend } from 'chart.js';

const CUSTOM_COLOR = '#FFB300';
const SECONDARY_COLOR = '#0c1633';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

const QuizProgressChart = () => {
  const avg = quiz_data.reduce((acc, curr) => acc + curr.value, 0) / quiz_data.length;

  const data = {
    labels: quiz_data.map(item => item.label),
    datasets: [
      {
        label: 'Calificación',
        data: quiz_data.map(item => item.value),
      },
      {
        label: 'Promedio',
        data: Array(quiz_data.length).fill(avg),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 2,
        borderColor: (ctx) =>
          ctx.datasetIndex === 0 ? `${CUSTOM_COLOR}70` : `${SECONDARY_COLOR}70`,
      },
      point: {
        radius: 4,
        backgroundColor: (ctx) =>
          ctx.datasetIndex === 0 ? CUSTOM_COLOR : SECONDARY_COLOR,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'black',
        },
      },
      x: {
        grid: { display: false },
        ticks: { color: 'black' },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'black',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
        },
      },
    },
  };

  return (
    <Box sx={{ height: '250px' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default QuizProgressChart;