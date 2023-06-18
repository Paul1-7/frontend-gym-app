import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormEmployee } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addEmployee } from '@/services';
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

  return (
    <DashboardContainer data={DASHBOARD.employees.add}>
      <Form methods={methods} onSubmit={employee.mutate}>
        <EmployeeForm isLoading={employee.isLoading} />
      </Form>
      {!employee.isLoading && !employee.isError && employee.isSuccess && <Navigate to={ROUTES.employees.default} />}
    </DashboardContainer>
  );
};

export default AddEmployee;
