import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormHall } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addHall } from '@/services';
import { ROUTES } from '@/routes';
import HallForm from './HallForm';

const AddHall = () => {
  const methods = useForm({
    resolver: yupResolver(schema.salones),
    defaultValues: initialFormHall,
    mode: 'all',
    criteriaMode: 'all',
  });

  const hall = useMutation({
    mutationFn: (data) => {
      return addHall({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.halls.add}>
      <Form methods={methods} onSubmit={hall.mutate}>
        <HallForm isLoading={hall.isLoading} />
      </Form>
      {!hall.isLoading && !hall.isError && hall.isSuccess && <Navigate to={ROUTES.halls.default} />}
    </DashboardContainer>
  );
};

export default AddHall;
