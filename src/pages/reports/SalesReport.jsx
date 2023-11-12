import { DASHBOARD, REPORT_FREQUENCY_OPTIONS, initialFormSaleReport, SALES_REPORT_CRITERIA_OPTIONS } from '@/constants';
import { useReport } from '@/hooks';
import schema from '@/schemas';
import { DashboardContainer, Select } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import DateRangePicker from './DateRangePicker';
import ReportContainer from './ReportContainer';

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

export default function SalesReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.salesReport),
    defaultValues: initialFormSaleReport,
    mode: 'all',
    criteriaMode: 'all',
  });
  const watchedIdDateRange = formMethods.watch('options.idDateRange');

  const report = useReport({
    formMethods,
    initialForm: initialFormSaleReport,
    filename: 'reporteVentas',
    criteriaOptions: SALES_REPORT_CRITERIA_OPTIONS,
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.sales}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterio" items={SALES_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select name="options.idDateRange" label="Rango de fechas" items={REPORT_FREQUENCY_OPTIONS} isArray />
            </Grid>
            {watchedIdDateRange === '5' && <DateRangePicker />}
          </Grid>
        }
        formMethods={formMethods}
        criteriaOptions={SALES_REPORT_CRITERIA_OPTIONS}
        reportNameTitle={'Reporte de ventas'}
        report={report}
        responseQuery={report.responseReport}
      />
    </DashboardContainer>
  );
}
