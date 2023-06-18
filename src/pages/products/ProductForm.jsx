import { PropTypes } from 'prop-types';
import { ButtonLink, DatePicker, Input, RadioGroup } from '@/components';
import { ITEMS_RADIO_GROUP } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const ProductForm = ({ isLoading }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Stock" name="stock" type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Precio de compra" name="precioCompra" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Precio de venta" name="precioVenta" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker label="fecha de vencimiento" name="fechaVencimiento" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.products.default}>
          Cancelar
        </ButtonLink>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<Save />}
          color="secondary"
          variant="outlined"
        >
          Guardar
        </LoadingButton>
      </div>
    </>
  );
};

ProductForm.propTypes = {
  plans: PropTypes.array,
  isLoading: PropTypes.bool,
  isExpandable: PropTypes.bool,
  withSubscription: PropTypes.bool,
};

export default ProductForm;