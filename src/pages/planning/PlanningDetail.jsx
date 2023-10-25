import { Backdrop, DashboardContainer, HeaderBusinessInfo } from '@/components';
import { DASHBOARD } from '@/constants';
import { Grid, Typography, Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { usePrint } from '@/hooks';
import { getPlanningById } from '@/services';
import { getDateLocale } from '@/utils';

const PlanningDetail = () => {
  const { componentToPrintRef, handlePrint, loadingPrint } = usePrint();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['getPlanningById'],
    queryFn: () => getPlanningById(id),
  });

  return (
    <DashboardContainer data={DASHBOARD.planning.detail}>
      <Backdrop isLoading={loadingPrint} />
      <Button onClick={handlePrint} variant="outlined" sx={{ displayPrint: 'none' }}>
        Imprimir detalle
      </Button>
      <Box
        ref={componentToPrintRef}
        sx={{
          '@media print': { padding: '2rem' },
          padding: '2.5rem 1.5rem',
          minWidth: '720px',
        }}
      >
        <HeaderBusinessInfo sx={{ display: 'none', displayPrint: 'block', mb: 2 }} />
        <Grid container>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Código de programación: </span>
              {data?.codProgramacion}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Fecha: </span>
              {`${getDateLocale(data?.fecha)} ${data?.hora} `}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Disciplina: </span>
              {data?.disciplina?.nombre}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Salón: </span>
              {data?.horario?.salon?.nombre}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Capacidad del salón: </span>
              {data?.horario?.salon?.capacidad}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Cupo disponible: </span>
              {data?.cupoDisponible}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3" gutterBottom>
              <span style={{ fontWeight: 600 }}>Entrenador: </span>
              {`${data?.entrenador?.nombre} ${data?.entrenador?.apellidoP}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" component={'h2'} sx={{ mt: 2, mb: 1 }}>
          Participantes de la clase:
        </Typography>
        {data?.detalle?.map(({ socio }, idx) => {
          return <Typography key={id}>{`${idx + 1}. ${socio.nombre} ${socio.apellidoP}`}</Typography>;
        })}
      </Box>
    </DashboardContainer>
  );
};

export default PlanningDetail;
