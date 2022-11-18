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
import Select from 'components/forms/container/Select';
import DatePicker from 'components/forms/container/DatePicker';
import { useEffect, useRef, useState } from 'react';
import { getBOBCurrency } from 'utils/dataHandler';
import dayjs from 'dayjs';
import add from 'date-fns/add';
import Autocomplete from 'components/forms/container/AutocompleteContainer';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const initialForm = {
  idPlan: '0',
  idSocio: null,
  montoCancelado: '',
  cantidad: '1',
  fechaInicio: new Date(),
  fechaFin: new Date(),
};

const customDataSocios = ({ data }) => {
  const newData = data.map(({ id, nombre, apellidoP, ci }) => ({
    id,
    nombre: `${nombre} ${apellidoP} - ${ci}`,
  }));

  return { data: newData };
};

const AddFormSuscripciones = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetPlanes, errorGetPlanes, loadingGetPlanes, axiosFetchGetPlanes] = useAxios();
  const [resGetSocios, , loadingGetSocios, axiosFetchGetSocios] = useAxios(customDataSocios);
  const [isExpandable, setIsExpandable] = useState(true);
  const planRef = useRef(null);

  const methods = useForm({
    resolver: yupResolver(schema.suscripciones),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const idPlan = methods.watch('idPlan');
  const cantidad = methods.watch('cantidad');
  const idSocio = methods.watch('idSocio');

  useEffect(() => {
    axiosFetchGetPlanes({
      axiosInstance: Axios,
      method: 'get',
      url: '/api/v1/planes',
    });

    axiosFetchGetSocios({
      axiosInstance: Axios,
      method: 'get',
      url: '/api/v1/socios',
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
    data.idSocio = data.idSocio.id;

    axiosFetchPost({
      axiosInstance: Axios,
      method: 'post',
      url: '/api/v1/suscripciones',
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (idPlan === '0') return;

    const { setValue } = methods;

    planRef.current = resGetPlanes.find((planes) => planes.id === idPlan);

    const { esExpandible } = planRef.current;
    setIsExpandable(!esExpandible);

    if (!esExpandible) setValue('cantidad', 1);
    setValue('fechaFin', add(new Date(), { days: planRef.current.duracion * cantidad }));
    setValue('montoCancelado', getBOBCurrency(planRef.current.precio * cantidad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPlan, cantidad]);

  return (
    <Container sx={{ padding: '16px', position: 'relative' }}>
      <Typography variant="h2" gutterBottom>
        Nueva suscripción
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {!loadingGetPlanes && !errorGetPlanes && !!resGetPlanes.length && (
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete name="idSocio" label="Socio" items={resGetSocios} loading={loadingGetSocios} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select name="idPlan" label="Planes" items={resGetPlanes} disabled={!idSocio} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Cantidad" name="cantidad" type="number" disabled={isExpandable} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Precio" name="montoCancelado" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker label="Fecha de inicio" name={'fechaInicio'} disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker label="Fecha fin" name={'fechaFin'} disabled />
              </Grid>
            </Grid>
          )}
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
        <Navigate to="/dashboard/suscripciones/" replace state={resPost} />
      )}
      <ToastContainer draggablePercent={60} />
    </Container>
  );
};

export default AddFormSuscripciones;

AddFormSuscripciones.propTypes = {
  title: PropTypes.string,
};
