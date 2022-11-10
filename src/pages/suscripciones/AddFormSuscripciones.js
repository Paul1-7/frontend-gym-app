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
import Select from 'components/forms/container/Select';
import DatePicker from 'components/forms/container/DatePicker';
import { useEffect, useRef, useState } from 'react';
import { getBOBCurrency } from 'utils/dataHandler';
import dayjs from 'dayjs';
import Autocomplete from 'components/forms/container/AutocompleteContainer';

const initialForm = {
  idPlan: '0',
  idSocio: null,
  montoCancelado: '',
  cantidad: '1',
  fechaInicio: new Date(),
  fechaFin: new Date(),
};

const AddFormSuscripciones = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetPlanes, errorGetPlanes, loadingGetPlanes, axiosFetchGetPlanes] = useAxios();
  const [resGetSocios, , loadingGetSocios, axiosFetchGetSocios] = useAxios();
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
    setValue('fechaFinal', dayjs().add(8, 'day'));
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
          {!loadingGetPlanes && !errorGetPlanes && resGetPlanes.length && (
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete name="idSocio" label="Socio" items={resGetSocios} loading={loadingGetSocios} />
              </Grid>
              <Select name="idPlan" label="Planes" items={resGetPlanes} disabled={!idSocio} />
              <Input label="Cantidad" name="cantidad" type="number" disabled={isExpandable} />
              <Input label="Precio" name="montoCancelado" disabled />
              <DatePicker label="Fecha de inicio" name={'fechaInicio'} disabled />
              <DatePicker label="Fecha fin" name={'fechaFin'} disabled />
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

export default AddFormSuscripciones;

AddFormSuscripciones.propTypes = {
  title: PropTypes.string,
};
