import {
  DASHBOARD,
  initialFormProductReport,
  PRODUCT_REPORT_CRITERIA_OPTIONS,
  PRODUCT_REPORT_SORT_OPTIONS,
} from '@/constants';
import { useReport } from '@/hooks';
import schema from '@/schemas';
import { DashboardContainer, Select } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import ReportContainer from './ReportContainer';

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

export default function ProductReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.productReport),
    defaultValues: initialFormProductReport,
    mode: 'all',
    criteriaMode: 'all',
  });

  const report = useReport({
    formMethods,
    criteriaOptions: PRODUCT_REPORT_CRITERIA_OPTIONS,
    initialFormOptions: initialFormProductReport.options,
    filename: 'reporte-producto',
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.products}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterio" items={PRODUCT_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select name="options.orderBy" label="Ordenar por" items={PRODUCT_REPORT_SORT_OPTIONS} isArray />
            </Grid>
          </Grid>
        }
        formMethods={formMethods}
        criteriaOptions={PRODUCT_REPORT_CRITERIA_OPTIONS}
        sortOptions={PRODUCT_REPORT_SORT_OPTIONS}
        reportNameTitle={'Reporte de productos'}
        report={report}
        responseQuery={report.responseReport}
      />
    </DashboardContainer>
  );
}
