import {
  DASHBOARD,
  initialFormEquipmentReport,
  EQUIPMENT_REPORT_CRITERIA_OPTIONS,
  EQUIPMENT_REPORT_SORT_OPTIONS,
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

export default function EquipmentReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.equipmentsReport),
    defaultValues: initialFormEquipmentReport,
    mode: 'all',
    criteriaMode: 'all',
  });

  const report = useReport({
    formMethods,
    criteriaOptions: EQUIPMENT_REPORT_CRITERIA_OPTIONS,
    initialFormOptions: initialFormEquipmentReport.options,
    filename: 'reporteMaquinarias',
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.equipments}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterio" items={EQUIPMENT_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select name="options.orderBy" label="Ordenar por" items={EQUIPMENT_REPORT_SORT_OPTIONS} isArray />
            </Grid>
          </Grid>
        }
        formMethods={formMethods}
        criteriaOptions={EQUIPMENT_REPORT_CRITERIA_OPTIONS}
        sortOptions={EQUIPMENT_REPORT_SORT_OPTIONS}
        reportNameTitle={'Reporte de equipamientos'}
        report={report}
        responseQuery={report.responseReport}
      />
    </DashboardContainer>
  );
}
