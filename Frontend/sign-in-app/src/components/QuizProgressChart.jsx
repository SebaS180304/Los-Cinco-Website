import React from 'react';
import { Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend } from 'chart.js';

{ /* Se necesita la informacion de las 5 evaluaciones mas recientes. Para esto es necesario conseguir la calificacion de las lecciones_completadas
  mas recientes. Es necesario el nombre de la leccion y su calificacion. */ }

const CUSTOM_COLOR = '#FFB300';
const SECONDARY_COLOR = '#0c1633';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

const QuizProgressChart = ({ course }) => {
  const filtCourse = course.filter(item => item.try > 0);

  if (filtCourse.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No hay evaluaciones con intentos.</Typography>
      </Box>
    );
  }

  const avg =
    filtCourse.reduce((acc, curr) => acc + curr.grade, 0) /
    filtCourse.length;

  const data = {
    labels: filtCourse.map(item => item.title),
    datasets: [
      {
        label: 'Calificación',
        data: filtCourse.map(item => item.grade),
      },
      {
        label: 'Promedio',
        data: Array(filtCourse.length).fill(avg),
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