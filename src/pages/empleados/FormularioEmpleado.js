import PropTypes from 'prop-types';
import Axios from 'apis';
import { Alert, Container, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { FormProvider, useForm } from 'react-hook-form';
import Input from 'components/forms/container/Input';
import RadioGroup from 'components/forms/container/RadioGroup';
import { ITEMS_RADIO_GROUP, ITEMS_SELECTS } from 'constants/inputs';
import Horarios from 'components/Horarios';
import Fieldset from 'components/forms/Fieldset';
import SelectChip from 'components/forms/container/SelectChip';

const initialForm = {
  ci: '',
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  edad: '',
  celular: '',
  direccion: '',
  estado: '1',
  usuario: '',
  password: '',
  repetirPassword: '',
  roles: [ITEMS_SELECTS[0].idRol],
  horarios: [
    {
      idDisciplina: '0',
      horarioEntrada: '',
      horarioSalida: '',
    },
  ],
};

const FormularioEmpleado = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.empleados),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  console.log(methods.formState.errors);

  const onSubmit = (data) => {
    const idRol = data.roles.map((id) => ({ idRol: id }));
    data = { ...data, roles: idRol };
    axiosFetchPost({
      axiosInstance: Axios,
      method: 'post',
      url: '/api/v1/empleados',
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <Container sx={{ padding: '16px', position: 'relative' }}>
      <Typography variant="h2" gutterBottom>
        Nuevo empleado
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <Grid container sx={{ display: 'grid' }} spacing={2}>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Fieldset title="Datos del empleado">
                <Grid container wrap="wrap" spacing={1}>
                  <Input label="Ci" name="ci" />
                  <Input label="Nombre" name="nombre" />
                  <Input label="Apellido Paterno" name="apellidoP" />
                  <Input label="Apellido Materno" name="apellidoM" />
                  <Input label="Celular" name="celular" type="number" />
                  <Input label="Direccion" name="direccion" />
                  <Input label="Edad" name="edad" type="number" />
                  <SelectChip name="roles" label="Roles" items={ITEMS_SELECTS} />
                  <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              </Fieldset>
              <Fieldset title="Datos del usuario">
                <Grid container wrap="wrap" spacing={1}>
                  <Input label="Usuario" name="usuario" />
                  <Input label="Contraseña" name="password" type="password" autoComplete="off" />
                  <Input label="Repetir contraseña" name="repetirPassword" type="password" autoComplete="off" />
                </Grid>
              </Fieldset>
            </Grid>
            <Horarios />
          </Grid>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <LoadingButton
              type="submit"
              loading={loadingPost}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              color="secondary"
              variant="outlined"
            >
              Guardar
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
      {!loadingPost && !errorPost && !Array.isArray(resPost) && (
        <Alert severity="success" sx={{ position: 'absolute', zIndex: 9999 }} variant="filled">
          se guardo con exito
        </Alert>
      )}
      {!loadingPost && errorPost && Array.isArray(resPost) && (
        <Alert severity="error" sx={{ position: 'absolute', zIndex: 9999 }} variant="filled">
          ocurrio un error
        </Alert>
      )}
    </Container>
  );
};

export default FormularioEmpleado;

FormularioEmpleado.propTypes = {
  title: PropTypes.string,
};
