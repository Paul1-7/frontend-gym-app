import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormProduct } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addProduct, categoriesList } from '@/services';
import { ROUTES } from '@/routes';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const methods = useForm({
    resolver: yupResolver(schema.productos),
    defaultValues: initialFormProduct,
    mode: 'all',
    criteriaMode: 'all',
  });

  const categories = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => categoriesList('?tipo=Producto'),
  });

  const hasExpiration = methods.watch('tieneVencimiento') === 'true';

  const product = useMutation({
    mutationFn: (data) => {
      return addProduct({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.products.add}>
      <Form methods={methods} onSubmit={product.mutate}>
        <ProductForm isLoading={product.isLoading} hasExpiration={!hasExpiration} categories={categories.data} />
      </Form>
      {!product.isLoading && !product.isError && product.isSuccess && <Navigate to={ROUTES.products.default} />}
    </DashboardContainer>
  );
};

export default AddProduct;
