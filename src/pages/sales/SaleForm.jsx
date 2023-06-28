import { PropTypes } from 'prop-types';
import { Autocomplete, DataTable, Input } from '@/components';

import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { ROUTES } from '@/routes/routes';
import { Person } from '@mui/icons-material';
import { COLUMNS_TABLE } from '@/constants';
import SalesProducts from './SalesProducts';

const SaleForm = ({ partners = [], products = [] }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid container wrap="wrap" spacing={1}>
          <Grid item xs={12} md={6}>
            <Input name="fecha" label="Fecha" disabled />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input name="idVendedor" label="Vendedor" disabled />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete name="idSocio" label="Socio" items={partners} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" component={Link} to={ROUTES.partners.add} startIcon={<Person />}>
              Nuevo socio
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction={{ md: 'row-reverse' }}>
        <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
          <div>
            <Box>
              <Typography variant="subtitle1" gutterBottom align="center">
                Lista de productos
              </Typography>
            </Box>
            <DataTable
              columns={COLUMNS_TABLE.productosParaVenta}
              rows={products}
              minStock={5}
              error={null}
              btnActions={{ add: true }}
              size="small"
              width="100%"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
          <SalesProducts />
        </Grid>
      </Grid>
    </>
  );
};

SaleForm.propTypes = {
  partners: PropTypes.array,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default SaleForm;
