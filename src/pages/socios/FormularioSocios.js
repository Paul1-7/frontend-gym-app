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
import { ITEMS_RADIO_GROUP } from 'constants/inputs';
import DatePicker from 'components/forms/container/DatePicker';
import { useEffect, useRef, useState } from 'react';
import Select from 'components/forms/container/Select';
import { getBOBCurrency } from 'utils/dataHandler';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import add from 'date-fns/add';

const intialFormSocios = {
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

const FormularioSocio = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetPlanes, errorGetPlanes, loadingGetPlanes, axiosFetchGetPlanes] = useAxios();
  const [isExpandable, setIsExpandable] = useState(true);
  const planRef = useRef(null);

  const methods = useForm({
    resolver: yupResolver(schema.socios),
    defaultValues: intialFormSocios,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  const idPlan = methods.watch('idPlan');
  const cantidad = methods.watch('cantidad');

  useEffect(() => {
    if (idPlan === '0') return;

    const { setValue } = methods;

    planRef.current = resGetPlanes.find((planes) => planes.id === idPlan);

    const { esExpandible } = planRef.current;
    setIsExpandable(!esExpandible);

    if (!esExpandible) setValue('cantidad', 1);
    setValue('fechaFin', add(new Date(), { days: planRef.current.duracion * cantidad }));
    setValue('precio', getBOBCurrency(planRef.current.precio * cantidad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPlan, cantidad]);

  useEffect(() => {
    axiosFetchGetPlanes({
      axiosInstance: Axios,
      method: 'get',
      url: '/api/v1/planes',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!errorPost) return;

    if (!loadingPost && errorPost)
      toast.error(errorPost.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPost]);

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data);
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
        nuevo Socio
      </Typography>
      {!loadingGetPlanes && !errorGetPlanes && resGetPlanes.length && (
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
                  <Input label="Edad" name="edad" type="number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              </Grid>
              <Typography variant="h3" gutterBottom>
                Suscripcion
              </Typography>
              <Grid item xs={12} wrap="wrap" container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Select name="idPlan" label="Planes" items={resGetPlanes} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input label="Cantidad" name="cantidad" type="number" disabled={isExpandable} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input label="Precio" name="precio" disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker label="Fecha de inicio" name={'fechaInicio'} disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker label="Fecha fin" name={'fechaFin'} disabled />
                </Grid>
              </Grid>
            </Grid>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
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
      )}
      {!loadingPost && !errorPost && !Array.isArray(resPost) && (
        <Navigate to="/dashboard/socios/" replace state={resPost} />
      )}
      <ToastContainer draggablePercent={60} />
    </Container>
  );
};

export default FormularioSocio;
