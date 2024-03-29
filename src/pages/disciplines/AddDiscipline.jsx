import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormDiscipline } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addDiscipline, getCategoriesDisciplinesItemsList } from '@/services';
import { ROUTES } from '@/routes';
import DisciplineForm from './DisciplineForm';

const AddDiscipline = () => {
  const methods = useForm({
    resolver: yupResolver(schema.disciplinas),
    defaultValues: initialFormDiscipline,
    mode: 'all',
    criteriaMode: 'all',
  });

  const discipline = useMutation({
    mutationFn: (data) => {
      return addDiscipline({ data });
    },
  });

  const categories = useQuery({
    queryKey: ['categoriesDiscipline'],
    queryFn: () => getCategoriesDisciplinesItemsList(),
  });

  return (
    <DashboardContainer data={DASHBOARD.disciplines.add}>
      <Form methods={methods} onSubmit={discipline.mutate}>
        <DisciplineForm isLoading={discipline.isLoading} categories={categories.data} />
      </Form>
      {!discipline.isLoading && !discipline.isError && discipline.isSuccess && (
        <Navigate to={ROUTES.disciplines.default} />
      )}
    </DashboardContainer>
  );
};

export default AddDiscipline;
