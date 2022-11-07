import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import Iconify from 'components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import DataTable from 'components/DataTable';

const columnsData = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'nombre', headerName: 'Nombre', flex: 1 },
  { field: 'descripcion', headerName: 'Descripción', flex: 1 },
  { field: 'salon', headerName: 'Salón', flex: 1 },
  { field: 'estado', headerName: 'Estado', flex: 1 },
];
export default function Disciplinas() {
  const [response, error, loading, axiosFetch] = useAxios();

  const getData = () => {
    axiosFetch({
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
        <DataTable rowsData={response} columnsData={columnsData} errors={error} loading={loading} />
      </Container>
    </Page>
  );
}
