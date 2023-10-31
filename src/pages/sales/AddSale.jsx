import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, ITEM_DEFAULT, initialFormSale } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import SaleForm from './SaleForm';
import { Navigate } from 'react-router-dom';
import { ButtonLink, DashboardContainer, Form } from '@/components';
import { addSale, partnersListFullName, productsList } from '@/services';
import { ROUTES } from '@/routes';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { useAuth } from '@/hooks';

const AddSale = () => {
  const { authenticated } = useAuth();
  const methods = useForm({
    resolver: yupResolver(schema.ventas),
    defaultValues: initialFormSale,
    mode: 'all',
    criteriaMode: 'all',
  });

  const sale = useMutation({
    mutationFn: (data) => {
      return addSale({ data });
    },
  });

  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersListFullName(),
  });

  const products = useQuery({
    queryKey: ['products'],
    queryFn: () => productsList(),
  });

  const handleSubmit = (data) => {
    const { id: idSocio } = data.socio ?? {};
    const newData = {
      ...data,
      idSocio: idSocio === ITEM_DEFAULT ? null : idSocio,
      idVendedor: authenticated.id,
    };

    sale.mutate(newData);
  };

  return (
    <DashboardContainer data={DASHBOARD.sales.add}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <SaleForm isLoading={sale.isLoading} partners={partners.data} products={products.data} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
          <ButtonLink variant="outlined" color="error" to={ROUTES.sales.default}>
            Cancelar
          </ButtonLink>
          <LoadingButton
            type="submit"
            loading={sale.isLoading}
            loadingPosition="start"
            startIcon={<Save />}
            color="secondary"
            variant="outlined"
          >
            Guardar
          </LoadingButton>
        </div>
      </Form>

      {!sale.isLoading && !sale.isError && sale.isSuccess && <Navigate to={ROUTES.sales.default} />}
    </DashboardContainer>
  );
};

export default AddSale;
