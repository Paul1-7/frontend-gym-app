import { useMutation, useQuery } from '@tanstack/react-query';
import { useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { categoriesEquipmentsList, deleteCategoryEquipment } from '@/services';

const buttonsActions = { edit: true, remove: true, detail: false };

const CategoriesEquipments = () => {
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['categoriesEquipmentsList'],
    queryFn: categoriesEquipmentsList,
  });

  const resDeleteCategoriesEquipments = useMutation({
    mutationFn: (id) => deleteCategoryEquipment({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteCategoriesEquipments.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.categories.equipment.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteCategoriesEquipments.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.categories}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={buttonsActions}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default CategoriesEquipments;
