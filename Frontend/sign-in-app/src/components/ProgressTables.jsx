import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ProgressTables = ({ course, totalLessons, completedLessons, isMobile }) => {
    if (isMobile) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SECCIONES</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white', textAlign: 'right' }}>ESTATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>Lecciones Completadas</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'right' }}>
                            {completedLessons}/{totalLessons}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>Examen Final</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'right' }}>
                            Intentos: {course?.intentos || 0}/{course?.intentosMax || 0}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>Calificación Examen</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'right' }}>
                            {course?.calificacionExamen || 0}%
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>LECCIONES COMPLETADAS</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EXAMEN FINAL</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>CAL. EXAMEN</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ color: 'white' }}>
                        {completedLessons}/{totalLessons}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                        Intentos: {course.intentos}/{course.intentosMax}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                        {course.calificacionExamen}%
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default ProgressTables;