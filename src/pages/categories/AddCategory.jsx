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
import { useCategory } from '@/hooks';

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

  const { typeList } = useCategory({ formMethods: methods });

  const handleSubmit = (data) => {
    const idsTipo = data.tipoLista.map(({ id }) => id);
    category.mutate({ ...data, idsTipo });
  };

  return (
    <DashboardContainer data={DASHBOARD.categories.add}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <CategoryForm isLoading={category.isLoading} typeList={typeList.data} />
      </Form>
      {!category.isLoading && !category.isError && category.isSuccess && <Navigate to={ROUTES.categories.default} />}
    </DashboardContainer>
  );
};

export default AddCategory;
