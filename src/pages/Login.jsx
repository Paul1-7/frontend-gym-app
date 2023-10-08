import { bgLogin } from '@/assets';
import { Form, Input, Logo, Page } from '@/components';
import { initialFormLogin } from '@/constants';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/routes';
import schema from '@/schemas';
import { sendCredencials } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { mutate, isLoading, data } = useMutation({
    mutationFn: (data) => {
      return sendCredencials({ data });
    },
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const methods = useForm({
    resolver: yupResolver(schema.login),
    defaultValues: initialFormLogin,
    mode: 'all',
    criteriaMode: 'all',
  });

  const handleSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (!data) return;

    login(data.data);
    navigate(ROUTES.subscriptions.default);
  }, [data]);

  return (
    <Page title="Login">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: 4,
          flexDirection: 'column',
          backgroundImage: `url(${bgLogin})`,
          objectFit: 'cover',
        }}
      >
        <Typography variant="h1" sx={{ color: 'white' }}>
          Inicio de sesión
        </Typography>
        <Card
          variant="outlined"
          sx={{
            maxWidth: '30rem',
            width: '25rem',
            backgroundColor: 'rgba(255,255,255,.7)',
          }}
        >
          <CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
            <Logo sx={{ height: 60 }} />
            <Form methods={methods} onSubmit={handleSubmit}>
              <Stack gap={2}>
                <Input name={'usuario'} label={'Usuario'} />
                <Input name={'password'} label={'Contraseña'} type={'password'} />
                <LoadingButton type="submit" loading={isLoading} color="secondary" variant="outlined">
                  Iniciar sesión
                </LoadingButton>
              </Stack>
            </Form>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
}
