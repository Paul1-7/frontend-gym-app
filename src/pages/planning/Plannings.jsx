import { useQuery } from '@tanstack/react-query';
import { DASHBOARD, COLUMNS_TABLE, BUTTONS_DATATABLE } from '@/constants';
import { DashboardContainer, DataTable } from '@/components';
import { planningList } from '@/services';
import { useAuth } from '@/hooks';

const Planning = () => {
  const { getAllowedButtonsDatatable } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ['planningList'],
    queryFn: () => planningList(),
  });

  return (
    <DashboardContainer data={DASHBOARD.planning.default}>
      <DataTable
        columns={COLUMNS_TABLE.planning}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={getAllowedButtonsDatatable(BUTTONS_DATATABLE.planning)}
        orderByDefault="fecha"
      />
    </DashboardContainer>
  );
};

export default Planning;
