import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import Iconify from 'components/Iconify';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import DataTable from 'components/dataTable/DataTable';

const columnsData = [
  { field: 'nombre', header: 'disciplina' },
  { field: 'salon', header: 'Nombre' },
  { field: 'estado', header: 'Estado' },
  {
    field: 'usuarios',
    children: [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'apellido' },
      { field: 'celular', header: 'celular' },
      { field: 'horarioEntrada', header: 'horario de entrada' },
      { field: 'horarioSalida', header: 'horario de salida' },
    ],
  },
];

const obtenerEmpleadosParaHorarios = (usuarios) =>
  usuarios.map((usuario) => ({
    nombre: usuario.nombre,
    apellido: usuario.apellidoP + usuario.apellidoM,
    celular: usuario.celular,
    horarioEntrada: usuario.Horarios.horarioEntrada,
    horarioSalida: usuario.Horarios.horarioSalida,
  }));

const datosPersonalizados = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    usuarios: obtenerEmpleadosParaHorarios(item.usuarios),
  }));

  return { data: newData };
};

export default function Horarios() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(datosPersonalizados);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/disciplinas',
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
          columns={columnsData}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          orderByDefault="nombre"
          collapse="usuarios"
        />
      </Container>
    </Page>
  );
}
