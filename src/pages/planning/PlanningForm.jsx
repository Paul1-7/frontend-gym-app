import { PropTypes } from 'prop-types';
import { Autocomplete, ButtonLink, Select } from '@/components';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';
import { DAYS_ITEMS } from '@/constants';

const PlanningForm = ({
  disciplines = [],
  trainers = [],
  partners = [],
  schedules = [],
  isLoading,
  disabledSubmit,
  enabledTrainer,
  enabledSchedules,
  enabledPartners,
}) => {
  return (
    <>
      <Grid item xs={12} wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <Select name="idDisciplina" label="Disciplinas" items={disciplines} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select name="dia" label="Dia" items={DAYS_ITEMS} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete name="idEntrenador" label="Entrenadores" items={trainers} disabled={enabledTrainer} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select name="idHorario" label="Horario" items={schedules} disabled={enabledSchedules} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            name="idSocio"
            label="Socio"
            items={partners}
            loading={isLoading}
            multiple
            disabled={enabledPartners}
          />
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.subscriptions.default}>
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
};

export default PlanningForm;
