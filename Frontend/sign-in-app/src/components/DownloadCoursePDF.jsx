import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from '../api/axios';
import categoryMapping from './constants/categoryMapping';

const COURSE_URL = 'CursoEstudiante/PDF?id_curso=';

const DownloadCoursePDF = ({ courseId }) => {
  const [loading, setLoading] = useState(false);

  const createPDF = async () => {
    try {
      setLoading(true);
      // Obtener datos del curso desde la API
      const response = await axios.get(`${COURSE_URL}${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const courseData = response.data;

      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const marginLeft = 20;
      const marginRight = 20;
      const marginTop = 30;
      const marginBottom = 20;

      // — Funciones para interlineado controlado —
      const ptToMm = pt => pt * 0.35278;
      // Aplicamos interlineado de 1.5 como en Word
      const getLineHeight = (fontSizePt, mult = 1.5) => ptToMm(fontSizePt) * mult;

      // — Parámetros de tamaño de fuente —
      const titleFontSize = 16;
      const contentFontSize = 12;
      const indexFontSize = 14;

      // — Calcular alturas de línea según tamaño de fuente —
      const titleLineHeight = getLineHeight(titleFontSize);
      const contentLineHeight = getLineHeight(contentFontSize);
      const indexLineHeight = getLineHeight(indexFontSize);

      // — Título y cabecera —
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text(courseData.tituloCurso, marginLeft, 30);

      doc.setFontSize(indexFontSize);
      doc.setFont('helvetica', 'italic');
      doc.text(`Categoría: ${categoryMapping[courseData.categoria]}`, marginLeft, 40);
      doc.text(`Lecciones: ${courseData.lecciones.length}`, marginLeft, 50);
      doc.text('Descripción:', marginLeft, 60);
      
      // Agregar descripción del curso con manejo de líneas y páginas
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(contentFontSize);
      let y = 70;
      
      const descriptionLines = doc.splitTextToSize(
        courseData.descripcionCurso,
        pageWidth - marginLeft - marginRight
      );
      
      descriptionLines.forEach(line => {
        if (y + contentLineHeight > pageHeight - marginBottom) {
          doc.addPage();
          y = marginTop;
        }
        doc.text(line, marginLeft, y);
        y += contentLineHeight;
      });
      
      // Agregar espacio después de la descripción
      y += contentLineHeight;

      // Reservamos página 2 para el índice
      doc.addPage();
      const indexPage = doc.getNumberOfPages();

      // Comenzamos contenido en página 3
      doc.addPage();
      doc.setPage(3);

      y = marginTop;
      const toc = [];

      courseData.lecciones.forEach((lec, i) => {
        // Guardar página de inicio de la lección
        const startPage = doc.getNumberOfPages();
        toc.push({ title: lec.tituloLeccion, page: startPage });

        // — Título de la lección —
        if (y + titleLineHeight > pageHeight - marginBottom) {
          doc.addPage();
          y = marginTop;
        }
        doc.setFontSize(titleFontSize);
        doc.setFont('helvetica', 'bold');
        doc.text(`${i + 1}. ${lec.tituloLeccion}`, marginLeft, y);
        y += titleLineHeight;
        // Espacio de párrafo después del título
        y += contentLineHeight;

        // — Contenido de la lección —
        doc.setFontSize(contentFontSize);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(
          lec.contenido,
          pageWidth - marginLeft - marginRight
        );
        lines.forEach(line => {
          if (y + contentLineHeight > pageHeight - marginBottom) {
            doc.addPage();
            y = marginTop;
          }
          doc.text(line, marginLeft, y);
          y += contentLineHeight;
        });
        // Espacio de párrafo tras contenido
        y += contentLineHeight;
      });

      // — Rellenamos la página de índice —
      doc.setPage(indexPage);
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('Tabla de contenidos', pageWidth / 2, 20, { align: 'center' });

      let yi = marginTop;
      doc.setFontSize(indexFontSize);
      doc.setFont('helvetica', 'normal');

      toc.forEach((item, idx) => {
        if (yi + indexLineHeight > pageHeight - marginBottom) {
          doc.addPage();
          doc.setPage(doc.getNumberOfPages());
          yi = marginTop;
        }
        doc.text(`${idx + 1}. ${item.title}`, marginLeft, yi);
        doc.text(`${item.page}`, pageWidth - marginRight, yi, { align: 'right' });
        // Espacio de párrafo en índice
        yi += indexLineHeight;
      });

      // — Descargar PDF —
      doc.save(`${courseData.tituloCurso}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={createPDF}
      disabled={loading}
      sx={{
        color: 'white',
        width: '100%',
        '&:hover': { backgroundColor: 'CC' },
        '&.Mui-disabled': { backgroundColor: '#273661CC', color: 'white'}
      }}
    >
      {loading ? 'Generando...' : 'Descargar'}
    </Button>
  );
};

export default DownloadCoursePDF;
