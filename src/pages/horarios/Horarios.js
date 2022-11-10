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

const datosPersonalizados = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    disciplina: item.disciplina.nombre,
    entrenador: `${item.entrenador.nombre} ${item.entrenador.apellidoP}`,
    salon: item.salon.nombre,
    capacidad: item.salon.capacidad,
  }));

  return { data: newData };
};

const buttonsActions = { edit: true, remove: true };

export default function Horarios() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(datosPersonalizados);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/horarios',
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Page title="Horarios">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Horarios
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/horarios/actualizar"
            startIcon={<Iconify icon="fluent:pen-16-filled" />}
          >
            Actualizar horario
          </Button>
        </Stack>
        <DataTable
          columns={COLUMNS.horarios}
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
