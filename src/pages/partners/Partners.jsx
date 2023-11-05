import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { partnersList, deletePartner } from '@/services';

const Partners = () => {
  const { getAllowedButtonsDatatable } = useAuth();

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
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.partners)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Partners;
