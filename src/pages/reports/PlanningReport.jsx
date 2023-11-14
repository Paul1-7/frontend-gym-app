import {
  DASHBOARD,
  REPORT_FREQUENCY_OPTIONS,
  initialFormPlanningReport,
  PLANNING_REPORT_CRITERIA_OPTIONS,
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

export default function PlanningsReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.planningReport),
    defaultValues: initialFormPlanningReport,
    mode: 'all',
    criteriaMode: 'all',
  });
  const { idDateRange } = formMethods.watch('options');

  const report = useReport({
    formMethods,
    initialForm: initialFormPlanningReport,
    filename: 'reporteProgramacion',
    criteriaOptions: PLANNING_REPORT_CRITERIA_OPTIONS,
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.planning}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterio" items={PLANNING_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select name="options.idDateRange" label="Rango de fechas" items={REPORT_FREQUENCY_OPTIONS} isArray />
            </Grid>
            {idDateRange === '5' && <DateRangePicker />}
          </Grid>
        }
        formMethods={formMethods}
        criteriaOptions={PLANNING_REPORT_CRITERIA_OPTIONS}
        reportNameTitle={'Reporte de programaciones de clases'}
        report={report}
        responseQuery={report.responseReport}
      />
    </DashboardContainer>
  );
}
