import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deleteHall, hallsList } from '@/services';

const Halls = () => {
  const { getAllowedButtonsDatatable } = useAuth();
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['hallsList'],
    queryFn: hallsList,
  });

  const resDeleteHalls = useMutation({
    mutationFn: (id) => deleteHall({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteHalls.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.halls.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteHalls.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.salones}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.halls)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Halls;
