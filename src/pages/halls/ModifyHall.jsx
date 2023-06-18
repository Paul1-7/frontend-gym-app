import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormHall } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getHallById, modifyHall } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import HallForm from './HallForm';

const ModifyEmployee = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.salones),
    defaultValues: initialFormHall,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyHallData = useMutation({
    mutationFn: (data) => {
      return modifyHall({ data, id });
    },
  });

  const hall = useQuery({
    queryKey: ['discipline'],
    queryFn: () => getHallById(id),
  });

  useEffect(() => {
    if (!hall.isSuccess) return;
    methods.reset(hall.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [hall.data]);

  return (
    <DashboardContainer data={DASHBOARD.halls.modify}>
      <Form methods={methods} onSubmit={modifyHallData.mutate}>
        <HallForm isLoading={modifyHallData.isLoading} />
      </Form>
      {!modifyHallData.isLoading && !modifyHallData.isError && modifyHallData.isSuccess && (
        <Navigate to={ROUTES.halls.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyEmployee;
