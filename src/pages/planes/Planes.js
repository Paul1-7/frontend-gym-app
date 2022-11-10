import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import Iconify from 'components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import DataTable from 'components/dataTable/DataTable';
import { COLUMNS } from 'constants/dataTable';

const buttonsActions = { edit: true, remove: true };

export default function Planes() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const getData = () => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/planes',
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Planes">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Planes
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/planes/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo plan
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.planes}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="nombre"
        />
      </Container>
    </Page>
  );
}
