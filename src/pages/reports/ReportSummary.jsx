import { getDateTimeFormat } from '@/utils';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ReportSummary = ({ sortOptions, frequencyOptions = [], watchedFormValues, criteriaOptions = [] }) => {
  const { criterio, idDateRange } = watchedFormValues;
  return (
    <Grid container wrap="wrap">
      {criterio && (
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Criterio: ${
            criteriaOptions.find(({ id }) => id === criterio)?.name ?? ''
          }`}</Typography>
        </Grid>
      )}
      {idDateRange && (
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Periodo: ${
            frequencyOptions.find(({ id }) => id === idDateRange)?.name ?? ''
          }`}</Typography>
        </Grid>
      )}
      <Grid item xs={6}>
        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Ordenado por: ${
          sortOptions.find(({ id }) => id === watchedFormValues.orderBy)?.name ?? ''
        }`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.5,
            display: 'none',
            displayPrint: 'inherit',
          }}
        >{`Fecha del reporte: ${getDateTimeFormat(new Date())}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: 'none', displayPrint: 'inherit' }}>
        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Realizado por: `}</Typography>
      </Grid>
    </Grid>
  );
};

ReportSummary.propTypes = {
  sortOptions: PropTypes.array,
  frequencyOptions: PropTypes.array,
  criteriaOptions: PropTypes.array,
  watchedFormValues: PropTypes.object,
};

export default ReportSummary;
