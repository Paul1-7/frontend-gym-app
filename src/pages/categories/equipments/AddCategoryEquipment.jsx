import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addCategoryEquipment } from '@/services';
import { ROUTES } from '@/routes';
import CategoryEquipmentForm from './CategoryEquipmentForm';

const AddCategoryEquipment = () => {
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const category = useMutation({
    mutationFn: (data) => {
      return addCategoryEquipment({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.categories.equipment.add}>
      <Form methods={methods} onSubmit={category.mutate}>
        <CategoryEquipmentForm isLoading={category.isLoading} />
      </Form>
      {!category.isLoading && !category.isError && category.isSuccess && (
        <Navigate to={ROUTES.categories.equipments.default} />
      )}
    </DashboardContainer>
  );
};

export default AddCategoryEquipment;
