// Guárdalo como components/charts/DonutChart.js (o como prefieras)

import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Ajustamos los settings para que sean flexibles
const settings = {
  margin: { top: 0, bottom: 20, left: 20, right: 20 }, // Damos espacio para el label
  width: 250,  // Un poco más grande
  height: 200,
  hideLegend: true,
};

//                  👇 Recibimos props: 'data' y 'title'
export default function DonutChart({ data, title }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: settings.width 
    }}>
      
      {/* 1. Título del Gráfico */}
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>

      {/* 2. El Gráfico */}
      <PieChart
        series={[
          {
            innerRadius: 50,
            outerRadius: 80, // Ajustado para que quepan los labels
            data, // 👈 Usamos la data que viene por props
            arcLabel: (item) => `${item.label} (${item.value})`, // Mostramos label y valor
            arcLabelMinAngle: 15, // No mostrar labels si el trozo es muy pequeño
          },
        ]}
        {...settings}
      />
    </Box>
  );
}