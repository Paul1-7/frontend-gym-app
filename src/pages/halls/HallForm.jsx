import { PropTypes } from 'prop-types';
import { ButtonLink, Input, RadioGroup } from '@/components';
import { ITEMS_RADIO_GROUP } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const HallForm = ({ isLoading }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Capacidad" name="capacidad" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.halls.default}>
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

HallForm.propTypes = {
  plans: PropTypes.array,
  isLoading: PropTypes.bool,
  isExpandable: PropTypes.bool,
  withSubscription: PropTypes.bool,
};

export default HallForm;
