import React, { useEffect } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import CheckMark from '@mui/icons-material/Check';

const ConfirmationPopup = ({ message, duration = 3000, onClose }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, [duration, onClose]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white', // Fondo transparente
        color: theme.palette.primary.main, // Color del texto igual al color primario
        padding: '10px 20px',
        borderRadius: '5px',
        border: `1px solid ${theme.palette.primary.main}`, // Borde con el color primario
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex', // Usar flexbox
        alignItems: 'center', // Alinear ícono y texto verticalmente
      }}
    >
      <CheckMark sx={{ color: theme.palette.primary.main, marginRight: '8px' }} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default ConfirmationPopup;