import { useQuery } from '@tanstack/react-query';
import { useAuth, useTable } from '@/hooks';
import { DASHBOARD, COLUMNS_TABLE, TEXT_MODAL, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable, DialogConfirmation } from '@/components';
import { subscriptionsList } from '@/services';

const Subscriptions = () => {
  const { getAllowedButtonsDatatable } = useAuth();

  const { table } = useTable();
  const { openDialog, setOpenDialog, handleCloseDialog, dataDialog } = table;
  const { data, error, isLoading } = useQuery({
    queryKey: ['subscriptionsList'],
    queryFn: subscriptionsList,
  });

  return (
    <DashboardContainer data={DASHBOARD.subscriptions.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.suscripciones}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.subscriptions)}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  );
};

export default Subscriptions;
