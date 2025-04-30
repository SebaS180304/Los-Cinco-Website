import React from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, } from '@mui/material';

const GradesTable = ({ grades, isMobile }) => {
    if (isMobile) {
        return (
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold', border: 'none' }}>
                            MÁS RECIENTE
                        </TableCell>
                        <TableCell sx={{ color: 'white', border: 'none' }}>
                            Intento {grades.length} - {grades[0].cal}%
                        </TableCell>
                    </TableRow>

                    {grades.length > 1 && (
                        <>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', border: 'none' }}>
                                    MÁS ALTO
                                </TableCell>
                                <TableCell sx={{ color: 'white', border: 'none' }}>
                                    {(() => {
                                        const highestGrade = grades.reduce((max, grade) => 
                                            grade.cal > max.cal ? grade : max
                                        , grades[0]);
                                        return `Intento ${grades.length - grades.indexOf(highestGrade)} - ${highestGrade.cal}%`;
                                    })()}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ borderBottom: '2px solid #2D3748', padding: '8px 16px' }} />
                            </TableRow>
                            {grades.map((grade, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ color: 'white' }}>
                                        Intento {grades.length - index}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }}>
                                        {grade.cal}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        );
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}></TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>INTENTO</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>PUNTAJE</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* ... resto del código de la tabla desktop ... */}
            </TableBody>
        </Table>
    );
};

export default GradesTable;