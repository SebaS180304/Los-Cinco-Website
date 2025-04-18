import React from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { week_data } from './constants';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

{ /* Se necesita informacion de las lecciones completadas por el usuario en la semana. Para esto es necesario conseguir la informacion de la tabla 
    lecciones_completadas y regresar los datos de las lecciones completadas en los ultimos 7 dias. Los datos necesarios son el dia de la semana y 
    las lecciones completadas en dicho dia. */ }

const CUSTOM_COLOR = '#FFB300';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const WeekProgressChart = () => {
    const data = {
        labels: week_data.map(data => data.label),
        datasets: [
            {
            label: 'Lecciones',
            data: week_data.map(data => data.lecciones),
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
        line: {
            tension: 0.3,
            borderColor: `${CUSTOM_COLOR}70`,
            borderWidth: 2,
        },
        point: {
            radius: 4,
            backgroundColor: CUSTOM_COLOR,
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
            display: false,
            }
        }
    };

  return (
    <Box sx={{ height: '250px' }}>
        <Line data={data} options={options} />
    </Box>
  );
};

export default WeekProgressChart;