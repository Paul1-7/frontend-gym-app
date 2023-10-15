import { Backdrop, DashboardContainer, HeaderBusinessInfo } from '@/components';
import { DASHBOARD, TYPES_CATEGORIES_ITEMS } from '@/constants';
import { Grid, Typography, Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { usePrint } from '@/hooks';
import { getCategoryById } from '@/services';

const CategoryDetail = () => {
  const { componentToPrintRef, handlePrint, loadingPrint } = usePrint();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['getCategoryById'],
    queryFn: () => getCategoryById(id),
  });

  const { disciplinas, maquinarias, productos } = data ?? {};
  let listType = [];
  if (disciplinas?.length > 0) {
    listType = disciplinas;
  }
  if (maquinarias?.length > 0) {
    listType = maquinarias;
  }
  if (productos?.length > 0) {
    listType = productos;
  }

  return (
    <DashboardContainer data={DASHBOARD.categories.detail}>
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
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>Nombre: </span>
              {data?.nombre}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>Tipo: </span>
              {data?.tipo && TYPES_CATEGORIES_ITEMS[data.tipo].name}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" component={'h2'} sx={{ mt: 2, mb: 1 }}>
          Elementos que conforman la categoría:
        </Typography>
        {listType.map(({ disciplina }, idx) => (
          <Typography key={disciplina.id}>{`${idx + 1}. ${disciplina.nombre}`}</Typography>
        ))}
      </Box>
    </DashboardContainer>
  );
};

export default CategoryDetail;
