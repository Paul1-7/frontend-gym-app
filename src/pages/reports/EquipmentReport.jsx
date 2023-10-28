import {
  DASHBOARD,
  REPORT_FREQUENCY_OPTIONS,
  initialFormEquipmentReport,
  EQUIPMENT_REPORT_CRITERIA_OPTIONS,
  EQUIPMENT_REPORT_SORT_OPTIONS,
  COLUMNS_EQUIPMENT_REPORT,
} from '@/constants';
import { usePrint, useReport } from '@/hooks';
import schema from '@/schemas';
import { Backdrop, DashboardContainer, Form, Select } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EmptyReport } from './EmptyReport';
import { useQuery } from '@tanstack/react-query';
import { ButtonsReport } from './ButtonsReport';
import { equipmentsListReport } from '@/services';
import ReportSummary from './ReportSummary';
import TableReport from './TableReport';
import { HeaderBusinessInfo } from '@/components';
import { useEffect } from 'react';

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
  const watchedFormValues = formMethods.watch();

  const { fileName, showAllRows, handleShowRows, searchTerm } = useReport({
    formMethods,
    criteriaOptions: EQUIPMENT_REPORT_CRITERIA_OPTIONS,

    initialFormOptions: initialFormEquipmentReport.options,
    filename: 'reporteMaquinarias',
  });

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['sales'],
    queryFn: () => equipmentsListReport({ params: searchTerm }),
    enabled: false,
  });

  useEffect(() => {
    if (!Object.values(searchTerm ?? {}).length) return;
    refetch();
  }, [searchTerm]);

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({
    fileName,
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.equipments}>
      <Backdrop isLoading={loadingPrint} />
      <Form methods={formMethods}>
        <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
          <Grid item xs={12} md={6}>
            <Select name="options.criterio" label="Criterio" items={EQUIPMENT_REPORT_CRITERIA_OPTIONS} isArray />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select name="options.orderBy" label="Ordenar por" items={EQUIPMENT_REPORT_SORT_OPTIONS} isArray />
          </Grid>
        </Grid>
        {!data && <EmptyReport />}
        {!!data?.length && (
          <ButtonsReport
            handlePrint={handlePrint}
            columnsCSV={COLUMNS_EQUIPMENT_REPORT}
            dataCSV={data}
            fileName={fileName}
          />
        )}
      </Form>
      {isSuccess && (
        <Grid
          ref={componentToPrintRef}
          sx={{
            '@media print': {
              padding: '2rem',
            },
            minWidth: '720px',
          }}
        >
          <FormGroup sx={{ paddingBottom: '2rem', displayPrint: 'none' }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  size="small"
                  value={showAllRows}
                  onChange={handleShowRows}
                  disabled={data?.length <= 10}
                />
              }
              label="Mostrar solo las 10 primeras filas"
            />
          </FormGroup>
          <HeaderBusinessInfo sx={{ display: 'none', displayPrint: 'block' }} />
          <Typography gutterBottom variant="h3" align="center" sx={{ display: 'none', displayPrint: 'inherit' }}>
            Reporte de maquinas
          </Typography>
          <ReportSummary
            criteriaOptions={EQUIPMENT_REPORT_CRITERIA_OPTIONS}
            frequencyOptions={REPORT_FREQUENCY_OPTIONS}
            sortOptions={EQUIPMENT_REPORT_SORT_OPTIONS}
            watchedFormValues={watchedFormValues.options}
          />
          <TableReport columns={COLUMNS_EQUIPMENT_REPORT} rows={data} showAllRows={showAllRows} />
        </Grid>
      )}
    </DashboardContainer>
  );
}
