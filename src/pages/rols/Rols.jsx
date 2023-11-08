import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deleteRol, rolsList } from '@/services';

const Rols = () => {
  const { getAllowedButtonsDatatable } = useAuth() ?? {};
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['rolsList'],
    queryFn: rolsList,
  });

  const resDeleteRols = useMutation({
    mutationFn: (id) => deleteRol({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteRols.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.rols.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteRols.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.rols}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.rols)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Rols;
