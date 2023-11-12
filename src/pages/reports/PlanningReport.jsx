import {
  DASHBOARD,
  REPORT_FREQUENCY_OPTIONS,
  initialFormScheduleReport,
  SCHEDULES_REPORT_CRITERIA_OPTIONS,
  DAYS_ITEMS_LIST,
} from '@/constants';
import { useReport } from '@/hooks';
import schema from '@/schemas';
import { DashboardContainer, Select } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import DateRangePicker from './DateRangePicker';
import ReportContainer from './ReportContainer';
import { useQuery } from '@tanstack/react-query';
import { disciplinesList } from '@/services';

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

export default function SchedulesReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.salesReport),
    defaultValues: initialFormScheduleReport,
    mode: 'all',
    criteriaMode: 'all',
  });
  const { idDateRange, criterio } = formMethods.watch('options');

  const report = useReport({
    formMethods,
    initialForm: initialFormScheduleReport,
    filename: 'reporteHorarios',
    criteriaOptions: SCHEDULES_REPORT_CRITERIA_OPTIONS,
  });

  const disciplines = useQuery({
    queryKey: ['categoriesProducts'],
    queryFn: () => disciplinesList(),
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.schedules}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterio" items={SCHEDULES_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select name="options.idDateRange" label="Rango de fechas" items={REPORT_FREQUENCY_OPTIONS} isArray />
            </Grid>
            {idDateRange === '5' && <DateRangePicker />}
            {criterio === '2' && (
              <Grid item xs={12} md={6}>
                <Select name="idDisciplina" label="Categorias" items={disciplines.data} isArray />
              </Grid>
            )}
            {criterio === '3' && (
              <Grid item xs={12} md={6}>
                <Select name="dia" label="Categorias" items={DAYS_ITEMS_LIST} isArray />
              </Grid>
            )}
          </Grid>
        }
        formMethods={formMethods}
        criteriaOptions={SCHEDULES_REPORT_CRITERIA_OPTIONS}
        reportNameTitle={'Reporte de horarios'}
        report={report}
        responseQuery={report.responseReport}
      />
    </DashboardContainer>
  );
}
