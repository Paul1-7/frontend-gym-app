import PropTypes from 'prop-types';
import Axios from 'apis';
import { Alert, Container, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { FormProvider, useForm } from 'react-hook-form';
import Horarios from 'components/Horarios';
import Fieldset from 'components/forms/Fieldset';
import Page from 'components/Page';
import Select from 'components/forms/container/Select';
import { useEffect } from 'react';

const initialForm = {
  idUsuario: '0',
  horarios: [
    {
      idDisciplina: '0',
      horarioEntrada: '',
      horarioSalida: '',
    },
  ],
};

const datosPersonalizados = ({ data }) => {
  const newData = data.map(({ nombre, apellidoP, apellidoM, id }) => ({
    id,
    nombre: `${nombre} ${apellidoP} ${apellidoM}`,
  }));
  return { data: newData };
};

const FormularioHorario = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetEmpleado, , , axiosFetchGetEmpleado] = useAxios(datosPersonalizados);

  useEffect(() => {
    axiosFetchGetEmpleado({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/empleados`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.horarios),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  console.log(methods.watch());
  const onSubmit = (data) => {
    const idRol = data.roles.map((id) => ({ idRol: id }));
    data = { ...data, roles: idRol };

    axiosFetchPost({
      axiosInstance: Axios,
      method: 'put',
      url: '/api/v1/horarios',
      requestConfig: {
        ...data,
      },
    });
  };



  return (
    <Page title="Agregar horario">
      <Container sx={{ padding: '16px', position: 'relative' }}>
        <Typography variant="h2" gutterBottom>
          Actualizar horario
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <Grid container sx={{ display: 'grid' }} spacing={2}>
              <Grid item xs={12} wrap="wrap" container spacing={2}>
                <Fieldset title="Datos de los horarios">
                  <Grid container wrap="wrap" spacing={1}>
                    <Select label="Empleado" name="idUsuario" items={resGetEmpleado} />
                    {methods.watch('idUsuario').length > 1 && <Horarios data={resGetEmpleado} />}
                  </Grid>
                </Fieldset>
              </Grid>
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
    </Page>
  );
};

export default FormularioHorario;

FormularioHorario.propTypes = {
  title: PropTypes.string,
};
