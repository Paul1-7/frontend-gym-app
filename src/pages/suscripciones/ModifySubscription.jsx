import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormSubscription } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import SubscriptionForm from './SubscriptionForm';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import {
  getLastSubscriptionsByIdSocio,
  getSubscriptionById,
  modifySubscription,
  partnersListFullName,
  plansListActive,
} from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { usePlanExpandible } from '@/hooks';

const ModifySubscription = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.suscripciones),
    defaultValues: initialFormSubscription,
    mode: 'all',
    criteriaMode: 'all',
  });
  const partnerWatch = methods.watch('idSocio');

  const modifySubscriptionData = useMutation({
    mutationFn: (data) => {
      return modifySubscription({ data, id });
    },
  });

  const subscription = useQuery({
    queryKey: ['subscription'],
    queryFn: () => getSubscriptionById(id),
  });

  const plans = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansListActive(),
  });
  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersListFullName(),
  });

  useEffect(() => {
    if (!subscription.isSuccess || plans.data || partners.data) return;

    methods.reset(subscription.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [subscription.data, plans.data, partners.data]);

  const handleSubmit = (data) => {
    const dataParsed = { ...data, idSocio: data.idSocio.id };
    modifySubscriptionData.mutate(dataParsed);
  };

  const activeSuscriptions = useQuery({
    queryKey: ['lastSubscription'],
    queryFn: () => getLastSubscriptionsByIdSocio(partnerWatch.id),
  });

  usePlanExpandible({
    methods,
    plans: plans.data,
    daysRemaining: activeSuscriptions.data?.daysRemaining ?? 0,
  });

  return (
    <DashboardContainer data={DASHBOARD.subscriptions.modify}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <SubscriptionForm
          isLoading={modifySubscriptionData.isLoading}
          plans={plans.data}
          partners={partners.data}
          isModify
        />
      </Form>
      {!modifySubscriptionData.isLoading && !modifySubscriptionData.isError && modifySubscriptionData.isSuccess && (
        <Navigate to={ROUTES.partners.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifySubscription;
