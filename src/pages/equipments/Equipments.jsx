import { useMutation, useQuery } from '@tanstack/react-query';
import { useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deleteEquipment, equipmentsList } from '@/services';

const buttonsActions = { edit: true, remove: true, detail: false };

const Equipments = () => {
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['equipmentsList'],
    queryFn: equipmentsList,
  });

  const resDeleteEquipment = useMutation({
    mutationFn: (id) => deleteEquipment({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteEquipment.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.equipments.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteEquipment.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.equipments}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={buttonsActions}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Equipments;
