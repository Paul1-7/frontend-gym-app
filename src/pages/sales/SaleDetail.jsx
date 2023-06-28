import { Backdrop, DashboardContainer, HeaderBussinessInfo } from '@/components';
import { BUSSINESS_INFO, DASHBOARD } from '@/constants';
import { getSaleById } from '@/services';
import { getBOBCurrency } from '@/utils';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { conversorNumerosALetras as ClaseConversor } from 'conversor-numero-a-letras-es-ar';
import { usePrint } from '@/hooks';

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

const getTotal = (items) => items.reduce((prev, current) => prev + current.precioAdquirido * current.cantidad, 0);

const SaleDetail = () => {
  const conversorNumerico = new ClaseConversor();
  const { componentToPrintRef, handlePrint, loadingPrint } = usePrint();
  const { id } = useParams();

  const { data, isSuccess } = useQuery({
    queryKey: ['getSaleById'],
    queryFn: () => getSaleById(id),
  });

  const total = getTotal(data?.detalle ?? []);

  return (
    <DashboardContainer data={DASHBOARD.sales.detail}>
      <Backdrop isLoading={loadingPrint} />
      <Button onClick={handlePrint} variant="outlined" sx={{ displayPrint: 'none' }}>
        Imprimir nota de venta
      </Button>
      <Box
        ref={componentToPrintRef}
        sx={{
          '@media print': { padding: '2rem' },
          padding: '2.5rem 1.5rem',
          minWidth: '720px',
        }}
      >
        <HeaderBussinessInfo sx={{ display: 'none', displayPrint: 'block', mb: 2 }}>
          <Grid container wrap="wrap" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" align="center">
                {BUSSINESS_INFO.name}
              </Typography>
              <Typography variant="subtitle1" align="center">
                Casa Matriz
              </Typography>
              <Typography variant="body2" align="center">
                {BUSSINESS_INFO.direction}
              </Typography>
              <Typography variant="body2" align="center">
                {`Teléfono: ${BUSSINESS_INFO.phone}`}
              </Typography>
              <Typography variant="body2" align="center" paragraph>
                {BUSSINESS_INFO.location}
              </Typography>
            </Grid>
            <Grid item container width={250}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Actividad</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{BUSSINESS_INFO.economicActivity}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </HeaderBussinessInfo>
        <Grid>
          <Typography variant="h3" align="center" paragraph>
            Nota de venta
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>Fecha: </span>
              {new Date(data?.fecha).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>NIT/CI/CEX: </span>
              {data?.socio?.ci ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>Nombre/Razon social: </span>
              {data?.socio?.nombre ?? ''} {data?.socio?.apellidoP ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={sxNoPrint}>
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>Vendedor: </span>
              {data?.vendedor?.nombre ?? ''} {data?.vendedor?.apellidoP ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={sxNoPrint}>
            <Typography component="h3">
              <span style={{ fontWeight: 600 }}>Codigo de referencia: </span>
              {data?.codVenta ?? ''}
            </Typography>
          </Grid>
        </Grid>
        <TableContainer sx={{ paddingTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PRODUCTO</TableCell>
                <TableCell align="center">CANTIDAD</TableCell>
                <TableCell align="center">PRECIO UNITARIO</TableCell>
                <TableCell align="center">SUBTOTAL</TableCell>
              </TableRow>
            </TableHead>
            {isSuccess && (
              <TableBody>
                {data.detalle.map(({ productos, cantidad, precioAdquirido }, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {productos.nombre}
                    </TableCell>
                    <TableCell align="center">{cantidad}</TableCell>
                    <TableCell align="center">{precioAdquirido}</TableCell>
                    <TableCell align="center">{(precioAdquirido * cantidad).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      borderBottom: 'none',
                      '@media print': {
                        borderBottom: 'none',
                        borderLeft: 'none',
                      },
                    }}
                  />
                  <TableCell align="center" sx={{ fontWeight: '700' }}>
                    TOTAL
                  </TableCell>
                  <TableCell align="center">{getBOBCurrency(total)}</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Grid>
          <Typography sx={{ fontWeight: '700', pt: 1 }} variant="body2" paragraph>
            {`Son: ${conversorNumerico.convertToText(parseInt(total, 10))} ${
              (total - parseInt(total, 10)).toFixed(2) * 100
            }/100 Bolivianos`}
          </Typography>
        </Grid>
      </Box>
    </DashboardContainer>
  );
};

export default SaleDetail;
