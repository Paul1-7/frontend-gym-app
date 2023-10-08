import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormSubscription } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import SubscriptionForm from './SubscriptionForm';
import { Navigate } from 'react-router-dom';
import { useLastSubscription, usePlanExpandible } from '@/hooks';
import { DashboardContainer, Form } from '@/components';
import { addSubscriptions, getLastSubscriptionsByIdSocio, partnersListFullName, plansList } from '@/services';
import { ROUTES } from '@/routes';
import { Alert, Grid } from '@mui/material';

const AddSubscription = () => {
  const methods = useForm({
    resolver: yupResolver(schema.suscripciones),
    defaultValues: initialFormSubscription,
    mode: 'all',
    criteriaMode: 'all',
  });
  const partnerWatch = methods.watch('idSocio');

  const partner = useMutation({
    mutationFn: (data) => {
      return addSubscriptions({ data });
    },
  });

  const plans = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansList(),
  });
  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersListFullName(),
  });

  const activeSuscriptions = useQuery({
    queryKey: ['lastSubscription'],
    queryFn: () => getLastSubscriptionsByIdSocio(partnerWatch.id),
  });

  const { data } = useLastSubscription({
    lastSubscription: activeSuscriptions.data,
    socio: partnerWatch.id,
    refetch: activeSuscriptions.refetch,
  });

  const canSuscribe = Boolean(data?.activeSuscriptions?.length > 1);

  const handleSubmit = (data) => {
    const dataParsed = { ...data, idSocio: data.idSocio.id };
    partner.mutate(dataParsed);
  };

  const { isExpandable } = usePlanExpandible({
    methods,
    plans: plans.data,
    daysRemaining: activeSuscriptions.data?.daysRemaining ?? 0,
  });

  return (
    <DashboardContainer data={DASHBOARD.subscriptions.add}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <SubscriptionForm
          isLoading={partner.isLoading}
          plans={plans.data}
          partners={partners.data}
          isExpandable={isExpandable}
          withSubscription
          disabledSubmit={canSuscribe}
        />
      </Form>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, flexDirection: 'column', gap: 2 }}
      >
        {data?.daysRemaining > 0 && (
          <Alert severity="info">
            El usuario tiene una suscripcion activa, con {data.daysRemaining} dias restantes
          </Alert>
        )}
        {canSuscribe && (
          <Alert severity="warning">
            El usuario no puede suscribirse porque ya tiene una suscripcion activa y varios dias de la anterior
            suscripción
          </Alert>
        )}
      </Grid>
      {!partner.isLoading && !partner.isError && partner.isSuccess && <Navigate to={ROUTES.subscriptions.default} />}
    </DashboardContainer>
  );
};

export default AddSubscription;
