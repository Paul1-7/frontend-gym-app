import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormEquipment } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getEquipmentById, modifyEquipment } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EquipmentForm from './EquipmentForm';

const ModifyEquipment = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.equipments),
    defaultValues: initialFormEquipment,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyEquipmentData = useMutation({
    mutationFn: (data) => {
      return modifyEquipment({ data, id });
    },
  });

  const equipment = useQuery({
    queryKey: ['equipment'],
    queryFn: () => getEquipmentById(id),
  });

  useEffect(() => {
    if (!equipment.isSuccess) return;
    methods.reset(equipment.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [equipment.data]);

  return (
    <DashboardContainer data={DASHBOARD.equipments.modify}>
      <Form methods={methods} onSubmit={modifyEquipmentData.mutate}>
        <EquipmentForm isLoading={modifyEquipmentData.isLoading} />
      </Form>
      {!modifyEquipmentData.isLoading && !modifyEquipmentData.isError && modifyEquipmentData.isSuccess && (
        <Navigate to={ROUTES.equipment.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyEquipment;
