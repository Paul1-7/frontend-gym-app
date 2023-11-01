import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getCategoryEquipmentById, modifyCategoryEquipment } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CategoryEquipmentForm from './CategoryEquipmentForm';

const ModifyCategoryEquipment = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyCategoryEquipmentData = useMutation({
    mutationFn: (data) => {
      return modifyCategoryEquipment({ data, id });
    },
  });

  const categoryEquipment = useQuery({
    queryKey: ['categoryEquipment'],
    queryFn: () => getCategoryEquipmentById(id),
  });

  useEffect(() => {
    if (!categoryEquipment.isSuccess) return;
    methods.reset(categoryEquipment.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [categoryEquipment.data]);

  return (
    <DashboardContainer data={DASHBOARD.categories.equipment.modify}>
      <Form methods={methods} onSubmit={modifyCategoryEquipmentData.mutate}>
        <CategoryEquipmentForm isLoading={modifyCategoryEquipmentData.isLoading} withState />
      </Form>
      {!modifyCategoryEquipmentData.isLoading &&
        !modifyCategoryEquipmentData.isError &&
        modifyCategoryEquipmentData.isSuccess && <Navigate to={ROUTES.categories.equipments.default} />}
    </DashboardContainer>
  );
};

export default ModifyCategoryEquipment;
