import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addCategory } from '@/services';
import { ROUTES } from '@/routes';
import CategoryForm from './CategoryForm';

const AddCategory = () => {
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const category = useMutation({
    mutationFn: (data) => {
      return addCategory({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.categories.add}>
      <Form methods={methods} onSubmit={category.mutate}>
        <CategoryForm isLoading={category.isLoading} />
      </Form>
      {!category.isLoading && !category.isError && category.isSuccess && <Navigate to={ROUTES.categories.default} />}
    </DashboardContainer>
  );
};

export default AddCategory;
