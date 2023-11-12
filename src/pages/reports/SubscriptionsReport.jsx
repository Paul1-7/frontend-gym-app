import {
  DASHBOARD,
  REPORT_FREQUENCY_OPTIONS,
  initialFormSubscriptionReport,
  SUBSCRIPTION_REPORT_CRITERIA_OPTIONS,
} from '@/constants';
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

export default function SubscriptionsReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.subscriptionsReport),
    defaultValues: initialFormSubscriptionReport,
    mode: 'all',
    criteriaMode: 'all',
  });
  const { idDateRange, criterio } = formMethods.watch('options');

  const report = useReport({
    formMethods,
    criteriaOptions: SUBSCRIPTION_REPORT_CRITERIA_OPTIONS,
    initialForm: initialFormSubscriptionReport,
    filename: 'reporte-suscripciones',
    sendCriterio: false,
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.subscriptions}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterios" items={SUBSCRIPTION_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            {criterio !== '4' && (
              <Grid item xs={12} md={6}>
                <Select name="options.idDateRange" label="Rango de fechas" items={REPORT_FREQUENCY_OPTIONS} isArray />
              </Grid>
            )}
            {idDateRange === '5' && <DateRangePicker />}
          </Grid>
        }
        formMethods={formMethods}
        criteriaOptions={SUBSCRIPTION_REPORT_CRITERIA_OPTIONS}
        reportNameTitle={'Reporte de suscripciones'}
        report={report}
        responseQuery={report.responseReport}
      />
    </DashboardContainer>
  );
}
