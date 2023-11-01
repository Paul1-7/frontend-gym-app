import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addCategoryProduct } from '@/services';
import { ROUTES } from '@/routes';
import CategoryProductForm from './CategoryProductForm';

const AddCategoryProduct = () => {
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const category = useMutation({
    mutationFn: (data) => {
      return addCategoryProduct({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.categories.products.add}>
      <Form methods={methods} onSubmit={category.mutate}>
        <CategoryProductForm isLoading={category.isLoading} />
      </Form>
      {!category.isLoading && !category.isError && category.isSuccess && (
        <Navigate to={ROUTES.categories.products.default} />
      )}
    </DashboardContainer>
  );
};

export default AddCategoryProduct;
