/* eslint-disable prefer-destructuring */
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import Iconify from 'components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import { COLUMNS } from 'constants/dataTable';
import DataTable from 'components/dataTable/DataTable';
import { toast, ToastContainer } from 'react-toastify';

const dataCustom = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    roles: item.roles.map(({ nombre }) => nombre),
  }));

  return { data: newData };
};

const filterCheck = (data) => data.filter(({ roles }) => roles.length > 1);

const buttonsActions = { edit: true, remove: true };
export default function Empleados() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(dataCustom);
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
      url: '/api/v1/empleados',
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Empleados">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Empleados
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/empleados/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo empleado
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.empleados}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="roles"
          filterCheck={filterCheck}
          labelFilterCheck="Filtrar solo empleados"
        />
        <ToastContainer draggablePercent={60} />
      </Container>
    </Page>
  );
}
