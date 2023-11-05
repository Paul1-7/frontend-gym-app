import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deletePlan, plansList } from '@/services';

const Plans = () => {
  const { getAllowedButtonsDatatable } = useAuth();

  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['plansList'],
    queryFn: plansList,
  });

  const resDeletePlan = useMutation({
    mutationFn: (id) => deletePlan({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeletePlan.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.plans.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeletePlan.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.planes}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.plans)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Plans;
