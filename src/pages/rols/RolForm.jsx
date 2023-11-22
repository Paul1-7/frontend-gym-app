import { PropTypes } from 'prop-types';
import { ButtonLink, CheckboxContainer, Input } from '@/components';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography, Alert } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const RolForm = ({ isLoading, menus = [], errorMenu }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12}>
            {menus.map(({ id, nombre, submenus }) => {
              return (
                <Stack key={id}>
                  <Typography variant="h6" component={'h2'}>
                    {nombre}
                  </Typography>
                  <Stack>
                    <CheckboxContainer name="idMenus" items={submenus} />
                  </Stack>
                </Stack>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      {errorMenu && (
        <Alert severity="error" variant="outlined" sx={{ mt: 2 }}>
          {errorMenu}
        </Alert>
      )}
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

RolForm.propTypes = {
  isLoading: PropTypes.bool,
  menus: PropTypes.array,
  errorMenu: PropTypes.string,
};

export default RolForm;
