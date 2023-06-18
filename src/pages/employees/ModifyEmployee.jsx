import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormEmployee } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getEmployeeById, modifyEmployee } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EmployeeForm from './EmployeeForm';

const ModifyEmployee = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.empleados),
    defaultValues: initialFormEmployee,
    mode: 'all',
    criteriaMode: 'all',
  });

  const modifyEmployeeData = useMutation({
    mutationFn: (data) => {
      return modifyEmployee({ data, id });
    },
  });

  const employee = useQuery({
    queryKey: ['employee'],
    queryFn: () => getEmployeeById(id),
  });

  useEffect(() => {
    if (!employee.isSuccess) return;
    methods.reset(employee.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [employee.data]);

  return (
    <DashboardContainer data={DASHBOARD.employees.modify}>
      <Form methods={methods} onSubmit={modifyEmployeeData.mutate}>
        <EmployeeForm isLoading={modifyEmployeeData.isLoading} />
      </Form>
      {!modifyEmployeeData.isLoading && !modifyEmployeeData.isError && modifyEmployeeData.isSuccess && (
        <Navigate to={ROUTES.employees.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyEmployee;
