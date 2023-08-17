import {
  COLUMNS_SALES_REPORT,
  SALES_REPORT_SORT_OPTIONS,
  DASHBOARD,
  REPORT_FREQUENCY_OPTIONS,
  initialFormSaleReport,
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
import { listSalesByDates } from '@/services';
import ReportSummary from './ReportSummary';
import TableReport from './TableReport';
import { HeaderBusinessInfo } from '@/components';
import DateRangePicker from './DateRangePicker';

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
  const watchedFormValues = formMethods.watch();

  const { fileName, showAllRows, handleShowRows, searchTerm } = useReport({
    formMethods,
    frequencyOptions: REPORT_FREQUENCY_OPTIONS,
    initialFormOptions: initialFormSaleReport.options,
    filename: 'reporteVentas',
  });

  const { data, isSuccess } = useQuery([searchTerm], ({ queryKey }) => {
    const params = queryKey?.[0];

    if (!params || !params.length) return;
    return listSalesByDates(params);
  });

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({
    fileName,
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.sales}>
      <Backdrop isLoading={loadingPrint} />
      <Form methods={formMethods}>
        <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
          <Grid item xs={12} md={6}>
            <Select name="options.criterio" label="Criterios" items={REPORT_FREQUENCY_OPTIONS} isArray />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select name="options.orderBy" label="Ordenar por" items={SALES_REPORT_SORT_OPTIONS} isArray />
          </Grid>
          {Number(watchedFormValues.options.criterio) === 5 && <DateRangePicker />}
        </Grid>
        {!data && <EmptyReport />}
        {!!data?.length && (
          <ButtonsReport
            handlePrint={handlePrint}
            columnsCSV={COLUMNS_SALES_REPORT}
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
            Reporte de ventas
          </Typography>
          <ReportSummary
            frequencyOptions={REPORT_FREQUENCY_OPTIONS}
            sortOptions={SALES_REPORT_SORT_OPTIONS}
            watchedFormValues={watchedFormValues.options}
          />
          <TableReport columns={COLUMNS_SALES_REPORT} rows={data} showAllRows={showAllRows} />
        </Grid>
      )}
    </DashboardContainer>
  );
}
