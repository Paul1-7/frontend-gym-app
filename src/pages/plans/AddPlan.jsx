import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPlan } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addPlan } from '@/services';
import { ROUTES } from '@/routes';
import PlanForm from './PlanForm';
import { usePlan } from '@/hooks';

const AddPlan = () => {
  const methods = useForm({
    resolver: yupResolver(schema.planes),
    defaultValues: initialFormPlan,
    mode: 'all',
    criteriaMode: 'all',
  });

  const plan = useMutation({
    mutationFn: (data) => {
      return addPlan({ data });
    },
  });

  const { hasExpiration } = usePlan({ formMethods: methods });

  return (
    <DashboardContainer data={DASHBOARD.plans.add}>
      <Form methods={methods} onSubmit={plan.mutate}>
        <PlanForm isLoading={plan.isLoading} hasExpiration={hasExpiration} />
      </Form>
      {!plan.isLoading && !plan.isError && plan.isSuccess && <Navigate to={ROUTES.plans.default} />}
    </DashboardContainer>
  );
};

export default AddPlan;
