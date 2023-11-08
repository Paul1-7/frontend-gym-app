import { PropTypes } from 'prop-types';
import { ButtonLink, Fieldset, Input, RadioGroup, SelectChip } from '@/components';
import { ITEMS_RADIO_GROUP } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const EmployeeForm = ({ isLoading, withState = false, rols = [] }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Fieldset title="Datos del empleado">
            <Grid container wrap="wrap" spacing={1}>
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
                <SelectChip name="roles" label="Roles" items={rols} />
              </Grid>
              {withState && (
                <Grid item xs={12} md={6}>
                  <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              )}
            </Grid>
          </Fieldset>
          <Fieldset title="Datos del usuario">
            <Grid container wrap="wrap" spacing={1}>
              <Grid item xs={12} md={6}>
                <Input label="Usuario" name="usuario" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Contraseña" name="password" type="password" autoComplete="off" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Repetir contraseña" name="repetirPassword" type="password" autoComplete="off" />
              </Grid>
            </Grid>
          </Fieldset>
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.employees.default}>
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

EmployeeForm.propTypes = {
  rols: PropTypes.array,
  isLoading: PropTypes.bool,
  withState: PropTypes.bool,
};

export default EmployeeForm;
