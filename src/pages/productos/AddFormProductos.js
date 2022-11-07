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
import { ITEMS_RADIO_GROUP } from 'constants/inputs';
import DatePicker from 'components/forms/container/DatePicker';

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

  return (
    <Container sx={{ padding: '16px', position: 'relative' }}>
      <Typography variant="h2" gutterBottom>
        Nuevo producto
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container sx={{ display: 'grid' }} spacing={2}>
            <Grid item xs={12} wrap="wrap" container spacing={2}>
              <Input label="Nombre" name="nombre" />
              <Input label="Stock" name="stock" type="number" />
              <Input label="Precio de compra" name="precioCompra" />
              <Input label="Precio de venta" name="precioVenta" />
              <DatePicker label="fecha de vencimiento" name="fechaVencimiento" />
              <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
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
  );
};

export default AddFormProductos;

AddFormProductos.propTypes = {
  title: PropTypes.string,
};
