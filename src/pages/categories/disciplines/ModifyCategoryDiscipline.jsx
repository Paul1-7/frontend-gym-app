import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormCategory } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getCategoryDisciplineById, modifyCategoryDiscipline } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CategoryDisciplineForm from './CategoryDisciplineForm';

const ModifyCategoryDiscipline = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialFormCategory,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyCategoryDisciplineData = useMutation({
    mutationFn: (data) => {
      return modifyCategoryDiscipline({ data, id });
    },
  });

  const categoryDiscipline = useQuery({
    queryKey: ['categoryDiscipline'],
    queryFn: () => getCategoryDisciplineById(id),
  });

  useEffect(() => {
    if (!categoryDiscipline.isSuccess) return;
    methods.reset(categoryDiscipline.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [categoryDiscipline.data]);

  return (
    <DashboardContainer data={DASHBOARD.categories.disciplines.modify}>
      <Form methods={methods} onSubmit={modifyCategoryDisciplineData.mutate}>
        <CategoryDisciplineForm isLoading={modifyCategoryDisciplineData.isLoading} withState />
      </Form>
      {!modifyCategoryDisciplineData.isLoading &&
        !modifyCategoryDisciplineData.isError &&
        modifyCategoryDisciplineData.isSuccess && <Navigate to={ROUTES.categories.disciplines.default} />}
    </DashboardContainer>
  );
};

export default ModifyCategoryDiscipline;
