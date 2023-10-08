import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPlanning } from '@/constants';
import schema from '@/schemas';
import PlanningForm from './PlanningForm';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes';
import { Grid, Typography, Alert } from '@mui/material';
import { usePlanning } from '@/hooks';
import { fDateTime } from '@/utils';

const AddPlanning = () => {
  const formMethods = useForm({
    resolver: yupResolver(schema.planning),
    defaultValues: initialFormPlanning,
    mode: 'all',
    criteriaMode: 'all',
  });
  const { fecha, idSocio } = formMethods.watch();
  const errorsSchema = formMethods.formState.errors;

  const {
    addPlanningData,
    disciplines,
    partners,
    trainers,
    enabledFields,
    schedules,
    selectedSchedule,
    isPlanningUnique,
  } = usePlanning({
    formMethods,
  });

  const roomCapacity = selectedSchedule?.salon?.capacidad ?? 1;

  const handleSubmit = (data) => {
    const dataParsed = { ...data, idSocio: data.idSocio.id };
    addPlanningData.mutate(dataParsed);
  };

  return (
    <DashboardContainer data={DASHBOARD.planning.add}>
      <Grid item xs={12} wrap="wrap" container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Fecha de la clase:</span>
            {fDateTime(fecha)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Salón:</span> {selectedSchedule?.salon?.nombre ?? 0}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Capacidad maxima del salón:</span> {roomCapacity}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Cupos disponibles:</span> {roomCapacity - idSocio.length}
          </Typography>
        </Grid>
      </Grid>
      <Form methods={formMethods} onSubmit={handleSubmit}>
        <PlanningForm
          isLoading={addPlanningData.isLoading}
          disciplines={disciplines.data}
          partners={partners.data}
          trainers={trainers.data}
          schedules={schedules.data}
          enabledTrainer={enabledFields.trainers}
          enabledSchedules={enabledFields.schedules}
          enabledPartners={enabledFields.partners}
          disabledSubmit={isPlanningUnique}
        />
      </Form>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, flexDirection: 'column', gap: 2 }}
      >
        {errorsSchema.cupoDisponible?.message && <Alert severity="error">{errorsSchema.cupoDisponible?.message}</Alert>}
      </Grid>
      {!addPlanningData.isLoading && !addPlanningData.isError && addPlanningData.isSuccess && (
        <Navigate to={ROUTES.planning.default} />
      )}
    </DashboardContainer>
  );
};

export default AddPlanning;
