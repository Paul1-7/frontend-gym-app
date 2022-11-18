import { useEffect } from 'react';
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Page from 'components/Page';
import useAxios from 'hooks/useAxios';
import axios from 'apis/';

import { useLocation } from 'react-router';
import { getBOBCurrency } from 'utils/dataHandler';
import Fieldset from 'components/forms/Fieldset';

export default function DetalleVentas() {
  const location = useLocation();
  const [resGet, , loadingGet, axiosFetchGet] = useAxios();
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/ventas/${id}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Detalle ventas" sx={{ position: 'relative' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Detalle de venta
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '2rem' }}>
          Muestra el detalle de la venta
        </Typography>
        {!Array.isArray(resGet) && (
          <Fieldset title="Datos de la venta">
            <Grid container wrap="wrap">
              <Grid item xs={12} sm={6}>
                <Typography component="h3" paragraph>
                  <span style={{ fontWeight: '600' }}>Código de venta:</span>
                  {` ${resGet.id}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="h3" paragraph>
                  <span style={{ fontWeight: '600' }}>Fecha:</span>
                  {` ${new Date(resGet.fecha).toLocaleDateString()}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="h3" paragraph>
                  <span style={{ fontWeight: '600' }}>Cliente:</span>
                  {` ${resGet.socio.nombre} ${resGet.socio.apellidoP} ${resGet.socio.apellidoM}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="h3" paragraph>
                  <span style={{ fontWeight: '600' }}>Vendedor:</span>
                  {` ${resGet.vendedor.nombre} ${resGet.vendedor.apellidoP} ${resGet.vendedor.apellidoM} `}
                </Typography>
              </Grid>
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCTO</TableCell>
                    <TableCell align="center">CANTIDAD</TableCell>
                    <TableCell align="center">PRECIO UNITARIO</TableCell>
                    <TableCell align="center">SUBTOTAL</TableCell>
                  </TableRow>
                </TableHead>
                {!Array.isArray(resGet) && (
                  <TableBody>
                    {resGet.detalle.map(({ productos, cantidad, precioAdquirido }, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {productos.nombre}
                        </TableCell>
                        <TableCell align="center">{cantidad}</TableCell>
                        <TableCell align="center">{getBOBCurrency(precioAdquirido)}</TableCell>
                        <TableCell align="center">{getBOBCurrency(precioAdquirido * cantidad)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ borderBottom: 'none' }} />
                      <TableCell align="center" sx={{ fontWeight: '700' }}>
                        TOTAL
                      </TableCell>
                      <TableCell align="center">
                        {getBOBCurrency(
                          resGet.detalle.reduce((prev, current) => prev + current.precioAdquirido * current.cantidad, 0)
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Fieldset>
        )}
      </Container>
    </Page>
  );
}
