import { Backdrop, Form, HeaderBusinessInfo } from '@/components';
import { usePrint } from '@/hooks';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ButtonsReport } from './ButtonsReport';
import ButtonShowAllRows from './ButtonShowAllRows';
import ReportSummary from './ReportSummary';
import TableReport from './TableReport';
import { EmptyReport } from './EmptyReport';
import { REPORT_FREQUENCY_OPTIONS } from '@/constants';

const ReportContainer = ({
  FormComponent,
  formMethods,
  responseQuery,
  report,
  reportNameTitle,
  criteriaOptions,
  frequencyOptions,
  sortOptions,
}) => {
  const { isSuccess, data } = responseQuery;
  const { filename, showAllRows, toggleShowRows, columns } = report;
  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({
    filename,
  });
  const watchedFormValues = formMethods.watch();

  return (
    <Form methods={formMethods}>
      <Backdrop isLoading={loadingPrint} />
      {FormComponent}
      {isSuccess && data?.length > 0 ? (
        <>
          <ButtonsReport handlePrint={handlePrint} columnsCSV={columns} dataCSV={data} filename={filename} />
          <Grid
            ref={componentToPrintRef}
            sx={{
              '@media print': {
                padding: '2rem',
              },
              minWidth: '720px',
            }}
          >
            <ButtonShowAllRows disabled={data?.length <= 10} onChange={toggleShowRows} showAllRows={showAllRows} />
            <HeaderBusinessInfo sx={{ display: 'none', displayPrint: 'block' }} />
            <Typography gutterBottom variant="h3" align="center" sx={{ display: 'none', displayPrint: 'inherit' }}>
              {reportNameTitle}
            </Typography>
            <ReportSummary
              criteriaOptions={criteriaOptions}
              frequencyOptions={frequencyOptions ?? REPORT_FREQUENCY_OPTIONS}
              sortOptions={sortOptions}
              watchedFormValues={watchedFormValues.options}
            />
            <TableReport columns={columns} rows={data} showAllRows={showAllRows} />
          </Grid>
        </>
      ) : (
        <EmptyReport />
      )}
    </Form>
  );
};

ReportContainer.propTypes = {
  FormComponent: PropTypes.element,
  formMethods: PropTypes.object,
  report: PropTypes.object,
  responseQuery: PropTypes.object,
  criteriaOptions: PropTypes.array,
  sortOptions: PropTypes.array,
  frequencyOptions: PropTypes.array,
  reportNameTitle: PropTypes.string,
};

export default ReportContainer;
