import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPlan } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getPlanById, modifyPlan } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PlanForm from './PlanForm';

const ModifyPlan = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.planes),
    defaultValues: initialFormPlan,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyPlanData = useMutation({
    mutationFn: (data) => {
      return modifyPlan({ data, id });
    },
  });

  const plan = useQuery({
    queryKey: ['plan'],
    queryFn: () => getPlanById(id),
  });

  useEffect(() => {
    if (!plan.isSuccess) return;
    methods.reset(plan.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true, keepTouched: true });
  }, [plan.data]);

  return (
    <DashboardContainer data={DASHBOARD.plans.modify}>
      <Form methods={methods} onSubmit={modifyPlanData.mutate}>
        <PlanForm isLoading={modifyPlanData.isLoading} />
      </Form>
      {!modifyPlanData.isLoading && !modifyPlanData.isError && modifyPlanData.isSuccess && (
        <Navigate to={ROUTES.plans.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyPlan;
