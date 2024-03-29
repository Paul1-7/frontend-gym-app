import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormDiscipline } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getCategoriesDisciplinesItemsList, getDisciplineById, modifyDiscipline } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DisciplineForm from './DisciplineForm';

const ModifyEmployee = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.disciplinas),
    defaultValues: initialFormDiscipline,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyDisciplineData = useMutation({
    mutationFn: (data) => {
      return modifyDiscipline({ data, id });
    },
  });

  const discipline = useQuery({
    queryKey: ['discipline'],
    queryFn: () => getDisciplineById(id),
  });

  const categories = useQuery({
    queryKey: ['categoriesDiscipline'],
    queryFn: () => getCategoriesDisciplinesItemsList(),
  });

  useEffect(() => {
    if (!discipline.isSuccess || !categories.isSuccess) return;
    methods.reset(discipline.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [discipline.data, categories.data]);

  return (
    <DashboardContainer data={DASHBOARD.disciplines.modify}>
      <Form methods={methods} onSubmit={modifyDisciplineData.mutate}>
        <DisciplineForm isLoading={modifyDisciplineData.isLoading} withState categories={categories.data} />
      </Form>
      {!modifyDisciplineData.isLoading && !modifyDisciplineData.isError && modifyDisciplineData.isSuccess && (
        <Navigate to={ROUTES.disciplines.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyEmployee;
