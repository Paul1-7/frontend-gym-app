import { useMutation, useQuery } from '@tanstack/react-query';
import { useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { categoriesDisciplinesList, deleteCategoryDiscipline } from '@/services';

const buttonsActions = { edit: true, remove: true, detail: false };

const CategoriesDisciplines = () => {
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['categoriesDisciplinesList'],
    queryFn: categoriesDisciplinesList,
  });

  const resDeleteCategoriesDisciplines = useMutation({
    mutationFn: (id) => deleteCategoryDiscipline({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteCategoriesDisciplines.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.categories.disciplines.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteCategoriesDisciplines.isLoading}
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

export default CategoriesDisciplines;
