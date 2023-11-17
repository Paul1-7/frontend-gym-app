import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormRoles } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getRolById, modifyRol } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import RolForm from './RolForm';
import { menuItemsList } from '@/services/menusService';

const ModifyRol = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.roles),
    defaultValues: initialFormRoles,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyRolData = useMutation({
    mutationFn: (data) => {
      return modifyRol({ data, id });
    },
  });

  const rol = useQuery({
    queryKey: ['rol'],
    queryFn: () => getRolById(id),
  });

  const menus = useQuery({
    queryKey: ['menus'],
    queryFn: () => menuItemsList(),
  });

  useEffect(() => {
    if (!rol.isSuccess || !menus.isSuccess) return;
    methods.reset(rol.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [rol.data, menus.data]);

  return (
    <DashboardContainer data={DASHBOARD.rols.modify}>
      <Form methods={methods} onSubmit={modifyRolData.mutate}>
        <RolForm isLoading={modifyRolData.isLoading} menus={menus.data} />
      </Form>
      {!modifyRolData.isLoading && !modifyRolData.isError && modifyRolData.isSuccess && (
        <Navigate to={ROUTES.rols.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyRol;
