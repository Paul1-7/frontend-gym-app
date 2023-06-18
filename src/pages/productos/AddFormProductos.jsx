import PropTypes from 'prop-types';
import Axios from 'apis';
import { Container, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/forms/container/Input';
import RadioGroup from '@/components/forms/container/RadioGroup';
import { ITEMS_RADIO_GROUP } from '@/constants/inputs';
import DatePicker from '@/components/forms/container/DatePicker';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const initialForm = {
  nombre: '',
  stock: '',
  precioCompra: '',
  precioVenta: '',
  fechaVencimiento: new Date(),
  estado: 1,
};

const AddFormProductos = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.productos),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: Axios,
      method: 'post',
      url: '/api/v1/productos',
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
        Nuevo producto
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container sx={{ display: 'grid' }} spacing={2}>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input label="Nombre" name="nombre" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input label="Stock" name="stock" type="number" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input label="Precio de compra" name="precioCompra" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input label="Precio de venta" name="precioVenta" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker label="fecha de vencimiento" name="fechaVencimiento" />
              </Grid>
              <Grid item xs={12} sm={6}>
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
        <Navigate to="/dashboard/productos/" replace state={resPost} />
      )}
      <ToastContainer draggablePercent={60} />
    </Container>
  );
};

export default AddFormProductos;

AddFormProductos.propTypes = {
  title: PropTypes.string,
};
