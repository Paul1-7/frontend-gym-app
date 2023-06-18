import { useMutation, useQuery } from '@tanstack/react-query';
import { useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { partnersList, deletePartner } from '@/services';

const buttonsActions = { edit: true, remove: true, detail: false };
const Partners = () => {
  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['partnersList'],
    queryFn: partnersList,
  });

  const resDeleteCustomer = useMutation({
    mutationFn: (id) => deletePartner({ id }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id) => {
    resDeleteCustomer.mutate(id);
  };

  return (
    <DashboardContainer data={DASHBOARD.partners.default}>
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
        columns={COLUMNS_TABLE.partners}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={buttonsActions}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Partners;
