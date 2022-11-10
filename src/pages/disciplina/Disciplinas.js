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

export default function Disciplinas() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const getData = () => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/disciplinas',
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Disciplinas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Disciplinas
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/disciplinas/nuevo"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nueva disciplina
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.disciplinas}
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
