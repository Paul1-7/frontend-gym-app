import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getCategoryProductById, modifyCategoryProduct } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CategoryProductForm from './CategoryProductForm';

const ModifyCategoryProduct = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyCategoryProductData = useMutation({
    mutationFn: (data) => {
      return modifyCategoryProduct({ data, id });
    },
  });

  const categoryProduct = useQuery({
    queryKey: ['categoryProduct'],
    queryFn: () => getCategoryProductById(id),
  });

  useEffect(() => {
    if (!categoryProduct.isSuccess) return;
    methods.reset(categoryProduct.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [categoryProduct.data]);

  return (
    <DashboardContainer data={DASHBOARD.categories.products.modify}>
      <Form methods={methods} onSubmit={modifyCategoryProductData.mutate}>
        <CategoryProductForm isLoading={modifyCategoryProductData.isLoading} withState />
      </Form>
      {!modifyCategoryProductData.isLoading &&
        !modifyCategoryProductData.isError &&
        modifyCategoryProductData.isSuccess && <Navigate to={ROUTES.categories.products.default} />}
    </DashboardContainer>
  );
};

export default ModifyCategoryProduct;
