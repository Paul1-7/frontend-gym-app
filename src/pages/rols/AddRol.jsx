import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormRoles } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes';
import RolForm from './RolForm';
import { addRol } from '@/services';
import { menuItemsList } from '@/services/menusService';
import { useEffect } from 'react';

const AddRol = () => {
  const methods = useForm({
    resolver: yupResolver(schema.roles),
    defaultValues: initialFormRoles,
    mode: 'all',
    criteriaMode: 'all',
  });
  const errorMenus = methods.formState.errors?.menus?.message;

  const rol = useMutation({
    mutationFn: (data) => {
      return addRol({ data });
    },
  });

  const menus = useQuery({
    queryKey: ['menus'],
    queryFn: () => menuItemsList(),
  });

  useEffect(() => {
    if (!menus.isSuccess) return;

    methods.setValue('menus', menus.data);
  }, [menus.data]);

  const handleSubmit = (data) => {
    rol.mutate(data);
  };

  return (
    <DashboardContainer data={DASHBOARD.rols.add}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <RolForm isLoading={rol.isLoading} menus={menus.data} errorMenu={errorMenus} />
      </Form>
      {!rol.isLoading && !rol.isError && rol.isSuccess && <Navigate to={ROUTES.rols.default} />}
    </DashboardContainer>
  );
};

export default AddRol;
