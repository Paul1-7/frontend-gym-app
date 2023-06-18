/* eslint-disable prefer-destructuring */
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import DataTable from '@/components/dataTable/DataTable';
import { COLUMNS_TABLE } from '@/constants/dataTable';
import { toast, ToastContainer } from 'react-toastify';

const buttonsActions = { edit: true, remove: true };
const customData = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    fechaInico: '',
    plan: item.plan.nombre,
    socio: `${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
  }));

  return { data: newData };
};
export default function Suscripciones() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let message;
    if (location.state?.message) {
      message = location.state.message;
      navigate(location.pathname, { replace: true });
    }
    // if (!Array.isArray(resDelete) && !errorDelete) {
    //   message = resDelete?.message;
    //   setResGet(resGet.filter((item) => item.id !== resDelete.id));
    // }

    // if (Array.isArray(resDelete) && errorDelete) {
    //   message = errorDelete.message;
    //   severity = 'error';
    //   setErrorDelete(null);
    // }

    if (message) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    // setOpenDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/suscripciones',
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Suscripciones">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Suscripciones
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/suscripciones/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nueva suscripción
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.suscripciones}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="nombre"
        />
        <ToastContainer draggablePercent={60} />
      </Container>
    </Page>
  );
}
