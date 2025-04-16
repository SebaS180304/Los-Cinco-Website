import React, { useState } from 'react';
import { Box, Typography, Stack, Divider, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import WeekProgressChart from './WeekProgressChart';
import CourseProgressChart from './CourseProgressChart';
import QuizProgressChart from './QuizProgressChart';

const CUSTOM_COLOR = '#FFB300';

const ProgressCharts = ({ course }) => {
  const [select, setSelect] = useState('semanal');

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  let chartComponent;
  if (select === 'cursos') {
    chartComponent = <CourseProgressChart course={course} />;
  } else if (select === 'evaluaciones') {
    chartComponent = <QuizProgressChart course={course} />;
  } else {
    chartComponent = <WeekProgressChart />;
  }

  return (
    <Box flex={2} sx={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid #000', p: 4 }}>
      <Stack spacing={1} divider={<Divider flexItem sx={{ border: '1px solid #000' }} />}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
            <Box flex={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {select === 'semanal'
                  ? 'Lecciones'
                  : select === 'cursos'
                  ? 'Cursos'
                  : 'Evaluaciones'}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                <InputLabel id="charts-dropdown-label" sx={{ color: 'initial', '&.Mui-focused': { color: CUSTOM_COLOR } }}>
                  Gráfico
                </InputLabel>
                <Select
                  labelId="charts-dropdown-label"
                  id="charts-dropdown"
                  value={select}
                  onChange={handleChange}
                  label="Gráfico"
                  autoWidth
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'initial',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: CUSTOM_COLOR,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: CUSTOM_COLOR,
                    },
                  }}
                >
                  <MenuItem value="semanal">Semanal</MenuItem>
                  <MenuItem value="cursos">Cursos</MenuItem>
                  <MenuItem value="evaluaciones">Evaluaciones</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>
        <Box>
          {chartComponent}
        </Box>
      </Stack>
    </Box>
  )
}

export default ProgressCharts;