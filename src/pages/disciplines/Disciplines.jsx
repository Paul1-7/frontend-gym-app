import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { deleteDiscipline, disciplinesList } from '@/services';

const Disciplines = () => {
  const { getAllowedButtonsDatatable } = useAuth();

  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['disciplinesList'],
    queryFn: disciplinesList,
  });

  const resDeleteDiscipline = useMutation({
    mutationFn: (id) => deleteDiscipline({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteDiscipline.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.disciplines.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteDiscipline.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.disciplinas}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.disciplines)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Disciplines;
