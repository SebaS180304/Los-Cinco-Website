import React from 'react';
import { Box, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

{ /* Se necesita informacion de los cursos activos del tecnico. Para esto es necesario conseguir la informacion de a cuales cursos esta inscrito el 
  tecnico. Los datos necesarios son el id del curso, nombre, categoria y progreso. Los datos tienen que estar ordenados de menor a mayor progreso. */ }

const CUSTOM_COLOR = '#FFB300';
const SECONDARY_COLOR = '#0c1633';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const categoryIconMapping = {
  0 : <HandymanOutlinedIcon/>,
  1 : <ElectricBoltIcon />,
  2 : <SecurityIcon />,
  3 : <SupportAgentIcon />
};

const CourseProgressChart = ({ course }) => {
  if (course.length === 0) {
      return (
        <Box sx={{ p: 2 }}>
          <Typography>Regresa aquí cuando tengas algún curso disponible para visualizar tu progreso en los cursos en los que estás inscrito.</Typography>
        </Box>
      );
    }

  const chartHeight = course.length * 50 + 32;

  const data = {
    labels: course.map(course => course?.tituloCurso),
    datasets: [
      {
        label: 'Progreso',
        data: course.map(course => course?.porcentaje),
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
        {course.map((course, index) => {
          const isEven = index % 2 === 0;
          return (
            <Box
              key={course?.idCurso}
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
                {course?.categoria !== undefined && course?.categoria !== null &&
                  React.cloneElement(categoryIconMapping[course?.categoria] || <></>, {
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
                {course.tituloCurso}
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