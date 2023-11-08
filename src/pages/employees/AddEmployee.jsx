import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormEmployee } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addEmployee, rolsListItemsChip } from '@/services';
import { ROUTES } from '@/routes';
import EmployeeForm from './EmployeeForm';

const AddEmployee = () => {
  const methods = useForm({
    resolver: yupResolver(schema.empleados),
    defaultValues: initialFormEmployee,
    mode: 'all',
    criteriaMode: 'all',
  });

  const employee = useMutation({
    mutationFn: (data) => {
      return addEmployee({ data });
    },
  });

  const rols = useQuery({
    queryKey: ['employee'],
    queryFn: () => rolsListItemsChip(),
  });

  return (
    <DashboardContainer data={DASHBOARD.employees.add}>
      <Form methods={methods} onSubmit={employee.mutate}>
        <EmployeeForm isLoading={employee.isLoading} rols={rols.data} />
      </Form>
      {!employee.isLoading && !employee.isError && employee.isSuccess && <Navigate to={ROUTES.employees.default} />}
    </DashboardContainer>
  );
};

export default AddEmployee;
