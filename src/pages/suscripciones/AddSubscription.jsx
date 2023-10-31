import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormSubscription } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import SubscriptionForm from './SubscriptionForm';
import { Navigate } from 'react-router-dom';
import { useLastSubscription, usePlanExpandible } from '@/hooks';
import { DashboardContainer, Form } from '@/components';
import { addSubscriptions, getLastSubscriptionsByIdSocio, partnersListFullName, plansListActive } from '@/services';
import { ROUTES } from '@/routes';
import { Alert, Grid } from '@mui/material';
import { useEffect } from 'react';
import { add } from 'date-fns';

const AddSubscription = () => {
  const methods = useForm({
    resolver: yupResolver(schema.suscripciones),
    defaultValues: initialFormSubscription,
    mode: 'all',
    criteriaMode: 'all',
  });
  const partnerWatch = methods.watch('idSocio');

  const subscription = useMutation({
    mutationFn: (data) => {
      return addSubscriptions({ data });
    },
  });

  const plans = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansListActive(),
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
    subscription.mutate(dataParsed);
  };

  const { isExpandable } = usePlanExpandible({
    methods,
    plans: plans.data,
    daysRemaining: activeSuscriptions.data?.daysRemaining ?? 0,
  });

  useEffect(() => {
    if (!activeSuscriptions.data) return;

    const daysRemaining = activeSuscriptions.data?.daysRemaining ?? 0;

    methods.setValue('fechaInicio', add(new Date(), { days: daysRemaining }));
    methods.setValue('daysRemaining', daysRemaining);
  }, [activeSuscriptions.data]);

  return (
    <DashboardContainer data={DASHBOARD.subscriptions.add}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <SubscriptionForm
          isLoading={subscription.isLoading}
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
      {!subscription.isLoading && !subscription.isError && subscription.isSuccess && (
        <Navigate to={ROUTES.subscriptions.default} />
      )}
    </DashboardContainer>
  );
};

export default AddSubscription;
