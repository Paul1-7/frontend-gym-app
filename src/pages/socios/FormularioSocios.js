import PropTypes from 'prop-types';
import Axios from 'apis';
import { Alert, Container, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import Inscripcion from 'components/Inscripcion';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { FormProvider, useForm } from 'react-hook-form';
import Input from 'components/forms/container/Input';
import RadioGroup from 'components/forms/container/RadioGroup';
import { ITEMS_RADIO_GROUP } from 'constants/inputs';

const intialFormSocios = {
  ci: '',
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  edad: '',
  celular: '',
  direccion: '',
  estado: '1',
  inscripcion: [
    {
      idDisciplina: '0',
      fechaInicio: new Date(),
      planPago: '',
      montoInscri: '',
    },
  ],
};

const FormularioSocio = ({ title }) => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.socios),
    defaultValues: intialFormSocios,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: Axios,
      method: 'post',
      url: '/api/v1/socios',
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <Container sx={{ padding: '16px', position: 'relative' }}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container sx={{ display: 'grid' }} spacing={2}>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Input label="Ci" name="ci" />
              <Input label="Nombre" name="nombre" />
              <Input label="Apellido Paterno" name="apellidoP" />
              <Input label="Apellido Materno" name="apellidoM" />
              <Input label="Celular" name="celular" type="number" />
              <Input label="Direccion" name="direccion" />
              <Input label="Edad" name="edad" type="number" />
              <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
            </Grid>
            <Inscripcion />
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

export default FormularioSocio;

FormularioSocio.propTypes = {
  title: PropTypes.string,
};
