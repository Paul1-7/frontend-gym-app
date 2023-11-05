import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { categoriesProductsList, deleteCategoryProduct } from '@/services';

const CategoriesProducts = () => {
  const { getAllowedButtonsDatatable } = useAuth();

  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['categoriesProductsList'],
    queryFn: categoriesProductsList,
  });

  const resDeleteCategoriesProducts = useMutation({
    mutationFn: (id) => deleteCategoryProduct({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteCategoriesProducts.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.categories.products.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteCategoriesProducts.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.categories}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.categoriesDisciplines)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default CategoriesProducts;
