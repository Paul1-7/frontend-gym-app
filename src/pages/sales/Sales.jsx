import { useQuery } from '@tanstack/react-query';
import { DASHBOARD, COLUMNS_TABLE, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable } from '@/components';
import { salesList } from '@/services';
import { useAuth } from '@/hooks';

const Sales = () => {
  const { getAllowedButtonsDatatable } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ['salesList'],
    queryFn: salesList,
  });

  return (
    <DashboardContainer data={DASHBOARD.sales.default}>
      <DataTable
        columns={COLUMNS_TABLE.ventas}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.sales)}
        orderByDefault="fecha"
      />
    </DashboardContainer>
  );
};

export default Sales;
