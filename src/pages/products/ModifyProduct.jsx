import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormProduct } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getProductById, modifyProduct } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductForm from './ProductForm';

const ModifyProduct = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.productos),
    defaultValues: initialFormProduct,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyProductData = useMutation({
    mutationFn: (data) => {
      return modifyProduct({ data, id });
    },
  });

  const product = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductById(id),
  });

  useEffect(() => {
    if (!product.isSuccess) return;
    methods.reset(product.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true, keepTouched: true });
  }, [product.data]);

  return (
    <DashboardContainer data={DASHBOARD.products.modify}>
      <Form methods={methods} onSubmit={modifyProductData.mutate}>
        <ProductForm isLoading={modifyProductData.isLoading} />
      </Form>
      {!modifyProductData.isLoading && !modifyProductData.isError && modifyProductData.isSuccess && (
        <Navigate to={ROUTES.products.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyProduct;
