import { PropTypes } from 'prop-types';
import { ButtonLink, DatePicker, Input, RadioGroup, Select } from '@/components';
import { ITEMS_RADIO_GROUP } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const PartnerForm = ({ plans = [], isLoading, isExpandable, withSubscription = false }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input label="Ci" name="ci" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Apellido Paterno" name="apellidoP" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Apellido Materno" name="apellidoM" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Celular" name="celular" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Direccion" name="direccion" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Edad" name="edad" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
          </Grid>
        </Grid>
        {withSubscription && (
          <>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Suscripcion
              </Typography>
            </Grid>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Grid item xs={12} md={6}>
                <Select name="idPlan" label="Planes" items={plans} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Cantidad" name="cantidad" type="number" disabled={isExpandable} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Precio" name="precio" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker label="Fecha de inicio" name={'fechaInicio'} disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker label="Fecha fin" name={'fechaFin'} disabled />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.partners.default}>
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

PartnerForm.propTypes = {
  plans: PropTypes.array,
  isLoading: PropTypes.bool,
  isExpandable: PropTypes.bool,
  withSubscription: PropTypes.bool,
};

export default PartnerForm;
