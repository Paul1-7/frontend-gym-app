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
import { getCategoriesProductsItemsList } from '@/services';
import { useQuery } from '@tanstack/react-query';

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

const handleParamsReport = (values) => {
  const { options, idCategoria } = values;
  if (options.criterio === '4') {
    return { idCategoria };
  }

  return {};
};

export default function ProductReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.productReport),
    defaultValues: initialFormProductReport,
    mode: 'all',
    criteriaMode: 'all',
  });
  const { criterio } = formMethods.watch('options');

  const report = useReport({
    formMethods,
    criteriaOptions: PRODUCT_REPORT_CRITERIA_OPTIONS,
    initialForm: initialFormProductReport,
    filename: 'reporte-producto',
    fnOPtions: handleParamsReport,
  });
  const categories = useQuery({
    queryKey: ['categoriesProducts'],
    queryFn: () => getCategoriesProductsItemsList(),
  });

  return (
    <DashboardContainer data={DASHBOARD.reports.products}>
      <ReportContainer
        FormComponent={
          <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
            <Grid item xs={12} md={6}>
              <Select name="options.criterio" label="Criterio" items={PRODUCT_REPORT_CRITERIA_OPTIONS} isArray />
            </Grid>
            {criterio === '4' && (
              <Grid item xs={12} md={6}>
                <Select name="idCategoria" label="Categorias" items={categories.data} isArray />
              </Grid>
            )}
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
