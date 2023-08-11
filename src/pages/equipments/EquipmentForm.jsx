import { PropTypes } from 'prop-types';
import { ButtonLink, DatePicker, Input, Select } from '@/components';
import { ITEMS_EQUIPMENT_STATES } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const EquipmentForm = ({ isLoading }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Marca" name="marca" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Modelo" name="modelo" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker label="Fecha de adquisición" name="fechaAdquisicion" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Capacidad (kl)" name="capacidad" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Precio" name="precio" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select name="estado" label="Estado" items={ITEMS_EQUIPMENT_STATES} />
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.equipment.default}>
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

EquipmentForm.propTypes = {
  plans: PropTypes.array,
  isLoading: PropTypes.bool,
  isExpandable: PropTypes.bool,
  withSubscription: PropTypes.bool,
};

export default EquipmentForm;
