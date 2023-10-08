import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getCategoryById, modifyCategory } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CategoryForm from './CategoryForm';
import { useCategory } from '@/hooks';

const ModifyCategory = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyCategoryData = useMutation({
    mutationFn: (data) => {
      return modifyCategory({ data, id });
    },
  });

  const category = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategoryById(id),
    cacheTime: 0,
  });

  useEffect(() => {
    if (!category.isSuccess) return;
    methods.reset(category.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [category.data]);

  const { typeList } = useCategory({ formMethods: methods });

  const handleSubmit = (data) => {
    const idsTipo = data.tipoLista.map(({ id }) => id);
    modifyCategoryData.mutate({ ...data, idsTipo });
  };

  return (
    <DashboardContainer data={DASHBOARD.categories.modify}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <CategoryForm isLoading={modifyCategoryData.isLoading} typeList={typeList.data} disabledType />
      </Form>
      {!modifyCategoryData.isLoading && !modifyCategoryData.isError && modifyCategoryData.isSuccess && (
        <Navigate to={ROUTES.categories.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyCategory;
