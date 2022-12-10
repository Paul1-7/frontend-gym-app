/* eslint-disable prefer-destructuring */
import { useContext, useEffect } from 'react';
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
import DataTableContext from 'context/DataTableContext';
import DialogConfirmation from 'components/DialogConfirmation';

const buttonsActions = { edit: true, remove: true };
const TEXTO_MODAL = '¿Esta seguro de borrar el registro seleccionado?, esta accion no se puede deshacer';

export default function Socios() {
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: Axios,
      method: 'DELETE',
      url: `/api/v1/socios/${id}`,
    });
  };

  useEffect(() => {
    let message;
    let action = 'success';

    if (location.state?.message) {
      message = location.state.message;
      navigate(location.pathname, { replace: true });
    }
    if (!Array.isArray(resDelete) && !errorDelete) {
      message = resDelete?.message;

      setResGet(resGet.filter((item) => item.id !== resDelete.id));
    }

    if (Array.isArray(resDelete) && errorDelete) {
      message = errorDelete.message;
      action = 'error';
      setErrorDelete(null);
    }

    if (message) {
      toast[action](message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    setOpenDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, resDelete, errorDelete]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/socios',
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Socio">
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={loadingDelete}
        textContent={TEXTO_MODAL}
        id={dataDialog}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Socios
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/socios/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo socio
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.socios}
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
