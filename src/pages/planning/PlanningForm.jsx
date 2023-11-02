import { PropTypes } from 'prop-types';
import { Autocomplete, ButtonLink } from '@/components';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const PlanningForm = ({ partners = [], schedules = [], isLoading, disabledSubmit, isModify }) => {
  return (
    <>
      <Grid item xs={12} wrap="wrap" container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete name="idHorario" label="Horarios" items={schedules} disabled={isModify} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete name="idSocio" label="Socio" items={partners} loading={isLoading} multiple />
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.planning.default}>
          Cancelar
        </ButtonLink>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<Save />}
          color="secondary"
          variant="outlined"
          disabled={disabledSubmit}
        >
          Guardar
        </LoadingButton>
      </div>
    </>
  );
};

PlanningForm.propTypes = {
  disciplines: PropTypes.array,
  trainers: PropTypes.array,
  partners: PropTypes.array,
  schedules: PropTypes.array,
  isLoading: PropTypes.bool,
  isExpandable: PropTypes.bool,
  disabledSubmit: PropTypes.bool,
  enabledTrainer: PropTypes.bool,
  enabledSchedules: PropTypes.bool,
  enabledPartners: PropTypes.bool,
  isModify: PropTypes.any,
};

export default PlanningForm;
