import { useQuery } from '@tanstack/react-query';
import { DASHBOARD, COLUMNS_TABLE } from '@/constants';
import { DashboardContainer, DataTable } from '@/components';
import { salesList } from '@/services';

const buttonsActions = { edit: false, remove: false, detail: true };
const Sales = () => {
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
        btnActions={buttonsActions}
        orderByDefault="fecha"
      />
    </DashboardContainer>
  );
};

export default Sales;
