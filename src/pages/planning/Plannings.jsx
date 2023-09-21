import { useQuery } from '@tanstack/react-query';
import { DASHBOARD, COLUMNS_TABLE } from '@/constants';
import { DashboardContainer, DataTable } from '@/components';
import { planningList } from '@/services';

const Planning = () => {
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
        btnActions={{ edit: true, modify: false, detail: true }}
        orderByDefault="fecha"
      />
    </DashboardContainer>
  );
};

export default Planning;
