import Axios from 'apis';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { FormProvider, useForm } from 'react-hook-form';
import Input from 'components/forms/container/Input';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate } from 'react-router-dom';
import Autocomplete from 'components/forms/container/AutocompleteContainer';
import DataTable from 'components/dataTable/DataTable';
import { COLUMNS } from 'constants/dataTable';
import { DataTableProvider } from 'context/DataTableContext';
import { Person } from '@mui/icons-material';
import VentaProductos from './VentasProductos';

const initialForm = {
  fecha: new Date().toLocaleDateString(),
  idSocio: { nombre: 'Ninguno', id: '0' },
  idVendedor: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
  productos: [],
};

const customDataSocios = ({ data }) => {
  const newData = data.map(({ nombre, apellidoP, ci, id }) => ({
    nombre: `${nombre} ${apellidoP}  -  ci: ${ci}`,
    idSocio: id,
  }));

  return { data: newData };
};

const AddFormVentas = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetProductos, errorGetProductos, loadingGetProductos, axiosFetchGetProductos] = useAxios();
  const [resGetSocios, , loadingGetSocios, axiosFetchGetSocios] = useAxios(customDataSocios);

  const methods = useForm({
    resolver: yupResolver(schema.ventas),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  console.log(methods.watch());

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data);
    data.idSocio = data.idSocio.idSocio;
    console.log('TCL: onSubmit -> data2', data);
    axiosFetchPost({
      axiosInstance: Axios,
      method: 'post',
      url: '/api/v1/ventas',
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

  useEffect(() => {
    axiosFetchGetSocios({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/socios`,
    });
    axiosFetchGetProductos({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/productos`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ padding: '16px', position: 'relative' }}>
      <DataTableProvider>
        <Typography variant="h3" gutterBottom>
          Nuevo venta
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Grid container wrap="wrap" spacing={1}>
              <Grid item xs={12} md={6}>
                <Input name="fecha" label="Fecha" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input name="idVendedor" label="Vendedor" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete name="idSocio" label="Socio" items={resGetSocios} loading={loadingGetSocios} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" component={Link} to="/dashboard/socios/nuevo" startIcon={<Person />}>
                  Nuevo socio
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} direction={{ md: 'row-reverse' }}>
              <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                <div>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom align="center">
                      Lista de productos
                    </Typography>
                  </Box>
                  <DataTable
                    columns={COLUMNS.productosParaVenta}
                    rows={resGetProductos}
                    loading={loadingGetProductos}
                    minStock={5}
                    error={errorGetProductos}
                    btnActions={{ add: true }}
                    size="small"
                    width="100%"
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                <VentaProductos />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingButton
                loading={loadingPost}
                type="submit"
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Guardar
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
        {!loadingPost && !errorPost && !Array.isArray(resPost) && (
          <Navigate to="/dashboard/ventas" replace state={resPost} />
        )}
        <ToastContainer draggablePercent={60} />
      </DataTableProvider>
    </Container>
  );
};

export default AddFormVentas;
