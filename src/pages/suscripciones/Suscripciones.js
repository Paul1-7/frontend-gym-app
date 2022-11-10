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
const customData = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    plan: item.plan.nombre,
    socio: `${item.socio.nombre} ${item.socio.apellidoP}`,
    ci: item.socio.ci,
  }));

  return { data: newData };
};
export default function Suscripciones() {
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);

  const getData = () => {
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'GET',
      url: '/api/v1/suscripciones',
    });
  };

  useEffect(() => {
    getData();
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
      </Container>
    </Page>
  );
}
