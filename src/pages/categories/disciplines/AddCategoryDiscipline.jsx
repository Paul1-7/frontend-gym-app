import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addCategoryDiscipline } from '@/services';
import { ROUTES } from '@/routes';
import CategoryDisciplineForm from './CategoryDisciplineForm';

const AddCategoryDiscipline = () => {
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const category = useMutation({
    mutationFn: (data) => {
      return addCategoryDiscipline({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.categories.disciplines.add}>
      <Form methods={methods} onSubmit={category.mutate}>
        <CategoryDisciplineForm isLoading={category.isLoading} />
      </Form>
      {!category.isLoading && !category.isError && category.isSuccess && (
        <Navigate to={ROUTES.categories.disciplines.default} />
      )}
    </DashboardContainer>
  );
};

export default AddCategoryDiscipline;
