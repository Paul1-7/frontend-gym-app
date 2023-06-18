import { useMutation, useQuery } from '@tanstack/react-query';
import { useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deleteProduct, productsList } from '@/services';

const buttonsActions = { edit: true, remove: true, detail: false };

const Productos = () => {
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['productsList'],
    queryFn: productsList,
  });

  const resDeleteProducts = useMutation({
    mutationFn: (id) => deleteProduct({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteProducts.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.products.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteProducts.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.productos}
        rows={data}
        error={error}
        loading={isLoading}
        minStock={5}
        numeration
        btnActions={buttonsActions}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Productos;
