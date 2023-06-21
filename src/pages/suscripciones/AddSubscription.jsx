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
    queryFn: plansList,
  });
  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: partnersListFullName,
  });

  const lastSubscription = useQuery({
    queryKey: ['lastSubscription'],
    queryFn: () => getLastSubscriptionsByIdSocio(partnerWatch.id),
  });

  const { data } = useLastSubscription({
    lastSubscription: lastSubscription.data,
    socio: partnerWatch.id,
    refetch: lastSubscription.refetch,
  });

  const handleSubmit = (data) => {
    const dataParsed = { ...data, idSocio: data.idSocio.id };
    partner.mutate(dataParsed);
  };

  const { isExpandable } = usePlanExpandible({
    methods,
    plans: plans.data,
    daysRemaining: lastSubscription.data?.daysRemaining ?? 0,
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
        />
      </Form>
      <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {data?.daysRemaining > 0 && (
          <Alert severity="info">
            El usuario tiene una suscripcion activa, con {data.daysRemaining} dias restantes
          </Alert>
        )}
      </Grid>
      {!partner.isLoading && !partner.isError && partner.isSuccess && <Navigate to={ROUTES.subscriptions.default} />}
    </DashboardContainer>
  );
};

export default AddSubscription;
