import React from 'react';
import { Box, Typography } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { course_data } from './constants';

const CUSTOM_COLOR = '#FFB300';
const SECONDARY_COLOR = '#0c1633';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const categoryIconMapping = {
  'Mecánica': <BuildIcon />,
  'Seguridad': <SecurityIcon />,
  'Electrónica': <ElectricBoltIcon />,
  'Atención al Cliente': <SupportAgentIcon />
};

const CourseProgressChart = () => {
  const chartHeight = course_data.length * 50 + 32;

  const data = {
    labels: course_data.map(course => course.title),
    datasets: [
      {
        label: 'Progreso',
        data: course_data.map(course => course.progress),
        backgroundColor: `${CUSTOM_COLOR}70`,
        barThickness: 30,
        borderRadius: 16,
        borderColor: CUSTOM_COLOR,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
          color: 'black',
        },
        grid: {
          drawBorder: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100px', borderRight: '1px solid #ccc', pr: 2 }}>
        {course_data.map((course, index) => {
          const isEven = index % 2 === 0;
          return (
            <Box
              key={course.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                borderBottom: '1px solid #eee',
                backgroundColor: isEven ? `${SECONDARY_COLOR}90` : 'inherit',
                color: isEven ? '#fff' : SECONDARY_COLOR,
                px: 1,
              }}
            >
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                {course.category &&
                  React.cloneElement(categoryIconMapping[course.category] || <></>, {
                    sx: { color: isEven ? '#fff' : SECONDARY_COLOR, fontSize: 'inherit' },
                  })}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.9rem',
                  color: isEven ? '#fff' : SECONDARY_COLOR,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {course.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/* Columna Derecha: Gráfica de barras con el progreso */}
      <Box sx={{ flexGrow: 1, height: chartHeight}}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default CourseProgressChart;