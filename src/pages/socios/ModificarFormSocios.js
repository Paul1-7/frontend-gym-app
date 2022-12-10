import PropTypes from 'prop-types';
import { Backdrop, CircularProgress, Container, Grid, Typography } from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { Navigate, useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import Axios from 'apis';
import { toast, ToastContainer } from 'react-toastify';
import Input from 'components/forms/container/Input';
import RadioGroup from 'components/forms/container/RadioGroup';
import { ITEMS_RADIO_GROUP } from 'constants/inputs';
import Select from 'components/forms/container/Select';
import DatePicker from 'components/forms/container/DatePicker';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { getBOBCurrency } from 'utils/dataHandler';
import add from 'date-fns/add';

const initialFormSocios = {
  ci: '',
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  edad: '',
  celular: '',
  direccion: '',
  estado: '1',
  idPlan: '0',
  cantidad: '1',
  precio: getBOBCurrency(0),
  fechaInicio: new Date(),
  fechaFin: new Date(),
};

export default function ModificarFormSocios() {
  const location = useLocation();
  const [resPut, errorPut, loadingPut, axiosFetchPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();
  const id = location.pathname.split('/').pop();

  const methods = useForm({
    resolver: yupResolver(schema.socios),
    defaultValues: initialFormSocios,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPut({
      axiosInstance: Axios,
      method: 'PUT',
      url: `/api/v1/socios/${id}`,
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/socios/${id}`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGet) && !errorGet) {
      const keys = Object.keys(initialFormSocios);
      const objectArray = Object.entries(resGet);

      for (const [key, value] of objectArray) {
        if (keys.includes(key)) {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resGet]);

  useEffect(() => {
    if (!errorPut) return;

    if (!loadingPut && errorPut)
      toast.error(errorPut.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPut, errorGet]);
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
    <CircularProgress color="inherit" />
  </Backdrop>;
  return (
    <Container sx={{ padding: '16px', position: 'relative' }}>
      <Typography variant="h2" gutterBottom>
        Modificar Socio
      </Typography>
      {!errorGet && !Array.isArray(resGet) && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container sx={{ display: 'grid' }} spacing={2}>
              <Grid item xs={12} wrap="wrap" container spacing={2}>
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
                  <Input label="Edad" name="edad" type="number"/>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              </Grid>
            </Grid>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <LoadingButton
                type="submit"
                loading={loadingPut}
                loadingPosition="start"
                startIcon={<Save />}
                color="secondary"
                variant="outlined"
              >
                Guardar
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      )}
      {!loadingPut && !errorPut && !Array.isArray(resPut) && (
        <Navigate to="/dashboard/socios/" replace state={resPut} />
      )}
      <ToastContainer draggablePercent={60} />
    </Container>
  );
}
