import { PropTypes } from 'prop-types';
import { ButtonLink, DatePicker, Input, RadioGroup } from '@/components';
import { ITEMS_RADIO_GROUP, RECURRENT_ITEMS_RADIO_GROUP } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const PlanForm = ({ isLoading, withState, hasExpiration }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Duracion en días" name="duracion" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Precio" name="precio" />
          </Grid>
          {withState && (
            <Grid item xs={12} md={6}>
              <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item container xs={12} md={6}>
            <Grid item xs={4}>
              <RadioGroup name="esRecurrente" label="Es recurrente" items={RECURRENT_ITEMS_RADIO_GROUP} />
            </Grid>
            {hasExpiration && (
              <Grid item xs={8}>
                <DatePicker label="Fecha de vencimiento" name="fechaVencimiento" disablePast />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.plans.default}>
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

PlanForm.propTypes = {
  isLoading: PropTypes.bool,
  withState: PropTypes.bool,
  hasExpiration: PropTypes.bool,
};

export default PlanForm;
