import PropTypes from 'prop-types';
import Axios from 'apis';
import { Container, Grid, Typography } from '@mui/material';
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
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';

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

  useEffect(() => {
    if (!errorPost) return;

    if (!loadingPost && errorPost)
      toast.error(errorPost.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPost]);

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
                    <SelectChip name="roles" label="Roles" items={ITEMS_SELECTS} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                  </Grid>
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
        <Navigate to="/dashboard/empleados/" replace state={resPost} />
      )}
      <ToastContainer draggablePercent={60} />
    </Container>
  );
};

export default FormularioEmpleado;

FormularioEmpleado.propTypes = {
  title: PropTypes.string,
};
