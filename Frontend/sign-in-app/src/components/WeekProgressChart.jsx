import React from 'react';
import { Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

const CUSTOM_COLOR = '#FFB300';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// Diccionario para traducir el día a la letra en español
const dayMapping = {
    Monday: 'L',    // Lunes
    Tuesday: 'Ma',   // Martes
    Wednesday: 'Mi', // Miércoles
    Thursday: 'J',  // Jueves
    Friday: 'V',    // Viernes
    Saturday: 'S',  // Sábado
    Sunday: 'D'     // Domingo
};

const WeekProgressChart = ({ weekProgress }) => {
    if (weekProgress.every(item => !(item?.cantidad > 0))) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography>
                    Regresa aquí cuando tengas alguna lección completada para visualizar tu progreso semanal.
                </Typography>
            </Box>
        );
    }

    const data = {
        labels: weekProgress.slice(0).reverse().map(item => dayMapping[item?.dia] || item?.dia),
        datasets: [
            {
                label: 'Lecciones',
                data: weekProgress.slice(0).reverse().map(item => item?.cantidad),
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