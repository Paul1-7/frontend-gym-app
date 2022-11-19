/* eslint-disable prefer-destructuring */
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import Iconify from 'components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import DataTable from 'components/dataTable/DataTable';
import { COLUMNS } from 'constants/dataTable';
import { toast, ToastContainer } from 'react-toastify';

const buttonsActions = { edit: true, remove: true, detail: true };

const customData = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    socio: ` ${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
    vendedor: ` ${item.vendedor.nombre} ${item.vendedor.apellidoP}`,
  }));

  return { data: newData };
};

export default function Ventas() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('TCL: Ventas -> location', location);

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
      url: '/api/v1/ventas',
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Ventas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ventas
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/ventas/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nueva venta
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.ventas}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="fecha"
        />
        <ToastContainer draggablePercent={60} />
      </Container>
    </Page>
  );
}
