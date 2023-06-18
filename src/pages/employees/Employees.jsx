import { useMutation, useQuery } from '@tanstack/react-query';
import { useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deleteEmployee, employeesList } from '@/services';

const filterCheck = (data) => data.filter(({ roles }) => roles.length > 1);

const buttonsActions = { edit: true, remove: true, detail: false };

const Employees = () => {
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['employeesList'],
    queryFn: employeesList,
  });

  const resDeleteCustomer = useMutation({
    mutationFn: (id) => deleteEmployee({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteCustomer.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.employees.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteCustomer.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.employees}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={buttonsActions}
        orderByDefault="nombre"
        filterLabel={'Filtrar solo empleados'}
        filterFn={filterCheck}
      />
    </DashboardContainer>
  );
};

export default Employees;
