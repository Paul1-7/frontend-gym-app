// @mui
import { Box, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { useAuth } from '@/hooks';
import { personGym } from '@/assets';

export default function DashboardApp() {
  const { authenticated } = useAuth() ?? {};
  const { nombre, apellidoP, apellidoM } = authenticated ?? {};
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Stack flexDirection={'row'}>
          <Box flex={1} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Typography variant="h3" sx={{ mt: 5 }} align="center">
              Hola, bienvenido de vuelta
            </Typography>
            <Typography variant="h3" sx={{ mb: 5 }} align="center">
              {`${nombre} ${apellidoP} ${apellidoM}`}
            </Typography>
          </Box>
          <Box flex={1} display={'flex'} justifyContent={'center'} sx={{ overflow: 'hidden' }}>
            <img src={personGym} alt="bg" style={{ width: '80%', overflow: 'hidden' }} />
          </Box>
        </Stack>
      </Container>
    </Page>
  );
}
