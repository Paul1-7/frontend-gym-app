import { PropTypes } from 'prop-types';
import { Autocomplete, ButtonLink, DatePicker, Input, Select } from '@/components';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const SubscriptionForm = ({ plans = [], partners = [], isLoading, isExpandable, disabledSubmit }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Autocomplete name="idSocio" label="Socio" items={partners} loading={isLoading} />
          </Grid>
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
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.subscriptions.default}>
          Cancelar
        </ButtonLink>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<Save />}
          color="secondary"
          variant="outlined"
          disabled={disabledSubmit}
        >
          Guardar
        </LoadingButton>
      </div>
    </>
  );
};

SubscriptionForm.propTypes = {
  plans: PropTypes.array,
  partners: PropTypes.array,
  isLoading: PropTypes.bool,
  isExpandable: PropTypes.bool,
  withSubscription: PropTypes.bool,
  disabledSubmit: PropTypes.bool,
};

export default SubscriptionForm;
