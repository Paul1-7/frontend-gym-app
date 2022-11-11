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
import { EXPANSIBLE_ITEMS_RADIO_GROUP, ITEMS_RADIO_GROUP } from 'constants/inputs';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const initialForm = {
  nombre: '',
  precio: '',
  duracion: '',
  esExpandible: 0,
  estado: 1,
};

const AddFormPlanes = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.planes),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: Axios,
      method: 'post',
      url: '/api/v1/planes',
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
        Nuevo plan
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container sx={{ display: 'grid' }} spacing={2}>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Grid item xs={12} md={6}>
                <Input label="Nombre" name="nombre" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Duracion en días" name="duracion" type="number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input label="Precio" name="precio" />
              </Grid>
            </Grid>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Grid item xs={12} md={6}>
                <RadioGroup name="esExpandible" label="Es Expandible" items={EXPANSIBLE_ITEMS_RADIO_GROUP} />
              </Grid>
              <Grid item xs={12} md={6}>
                <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
              </Grid>
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
        <Navigate to="/dashboard/planes/" replace state={resPost} />
      )}
      <ToastContainer draggablePercent={60} />
    </Container>
  );
};

export default AddFormPlanes;

AddFormPlanes.propTypes = {
  title: PropTypes.string,
};
