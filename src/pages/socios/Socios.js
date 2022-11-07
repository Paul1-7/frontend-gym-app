import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import Iconify from 'components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import { COLUMNS } from 'constants/dataTable';
import DataTable from 'components/dataTable/DataTable';

const buttonsActions = { edit: true, remove: true };

export default function Socios() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const getData = () => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/socios',
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Socio">
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
      </Container>
    </Page>
  );
}
