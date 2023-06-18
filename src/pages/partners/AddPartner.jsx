import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPartner } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import PartnerForm from './PartnerForm';
import { Navigate } from 'react-router-dom';
import { usePlanExpandible } from '@/hooks';
import { DashboardContainer, Form } from '@/components';
import { addPartner, plansList } from '@/services';
import { ROUTES } from '@/routes';

const AddPartner = () => {
  const methods = useForm({
    resolver: yupResolver(schema.socios),
    defaultValues: initialFormPartner,
    mode: 'all',
    criteriaMode: 'all',
  });

  const partner = useMutation({
    mutationFn: (data) => {
      return addPartner({ data });
    },
  });

  const plans = useQuery({
    queryKey: ['plans'],
    queryFn: plansList,
  });

  const { isExpandable } = usePlanExpandible({ methods, plans: plans.data });

  return (
    <DashboardContainer data={DASHBOARD.partners.add}>
      <Form methods={methods} onSubmit={partner.mutate}>
        <PartnerForm isLoading={partner.isLoading} plans={plans.data} isExpandable={isExpandable} withSubscription />
      </Form>
      {!partner.isLoading && !partner.isError && partner.isSuccess && <Navigate to={ROUTES.partners.default} />}
    </DashboardContainer>
  );
};

export default AddPartner;
