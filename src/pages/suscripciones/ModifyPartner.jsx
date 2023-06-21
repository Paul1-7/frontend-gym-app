import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPartner } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import SubscriptionForm from './SubscriptionForm';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getPartnerById, modifyPartner, plansList } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ModifyPartner = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.socios),
    defaultValues: initialFormPartner,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyPartnerData = useMutation({
    mutationFn: (data) => {
      return modifyPartner({ data, id });
    },
  });

  const partner = useQuery({
    queryKey: ['partner'],
    queryFn: () => getPartnerById(id),
  });

  const plans = useQuery({
    queryKey: ['plans'],
    queryFn: plansList,
  });

  useEffect(() => {
    if (!partner.isSuccess) return;

    methods.reset(partner.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [partner.data]);

  return (
    <DashboardContainer data={DASHBOARD.partners.modify}>
      <Form methods={methods} onSubmit={modifyPartnerData.mutate}>
        <SubscriptionForm isLoading={modifyPartnerData.isLoading} plans={plans.data} />
      </Form>
      {!modifyPartnerData.isLoading && !modifyPartnerData.isError && modifyPartnerData.isSuccess && (
        <Navigate to={ROUTES.partners.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyPartner;
