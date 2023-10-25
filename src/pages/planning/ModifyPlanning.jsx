import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPlanning } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { ROUTES } from '@/routes/routes';
import { getPlanningById, modifyPlanning } from '@/services';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { usePlanning } from '@/hooks';
import PlanningForm from './PlanningForm';
import { Grid, Typography, Alert } from '@mui/material';
import { fDate } from '@/utils';

const ModifyPlanning = () => {
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(schema.planning),
    defaultValues: initialFormPlanning,
    mode: 'all',
    criteriaMode: 'all',
  });

  const { fecha, hora } = methods.watch();
  const errorsSchema = methods.formState.errors;

  const modifyPlanningData = useMutation({
    mutationFn: (data) => {
      return modifyPlanning({ data, id });
    },
  });

  const planning = useQuery({
    queryKey: ['planning'],
    queryFn: () => getPlanningById(id),
    cacheTime: 0,
  });

  const {
    addPlanningData,
    disciplines,
    partners,
    trainers,
    enabledFields,
    schedules,
    selectedSchedule,
    isPlanningUnique,
    availableQuotas,
    roomCapacity,
  } = usePlanning({
    formMethods: methods,
  });

  useEffect(() => {
    if (!planning.isSuccess) return;

    methods.reset(planning.data, { keepErrors: true, keepIsValid: true, keepDefaultValues: true });
  }, [planning.data, trainers.data, partners.data, disciplines.data, schedules.data]);

  const handleSubmit = (data) => {
    const { idSocio, ...rest } = data;
    const detalle = idSocio.map(({ id }) => ({ idSocio: id }));
    const dataParsed = { programacion: { ...rest, idEntrenador: rest.idEntrenador.id }, detalle };
    modifyPlanningData.mutate(dataParsed);
  };

  return (
    <DashboardContainer data={DASHBOARD.planning.modify}>
      <Grid item xs={12} wrap="wrap" container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Fecha de la clase:</span>
            {` ${fDate(fecha)} ${hora}`}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Salón:</span>{' '}
            {selectedSchedule?.salon?.nombre ?? 'No seleccionó un salón'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Capacidad maxima del salón:</span> {roomCapacity}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Cupos disponibles:</span> {availableQuotas}
          </Typography>
        </Grid>
      </Grid>
      <Form methods={methods} onSubmit={handleSubmit}>
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
          isModify
        />
      </Form>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, flexDirection: 'column', gap: 2 }}
      >
        {errorsSchema.cupoDisponible?.message && <Alert severity="error">{errorsSchema.cupoDisponible?.message}</Alert>}
      </Grid>
      {!modifyPlanningData.isLoading && !modifyPlanningData.isError && modifyPlanningData.isSuccess && (
        <Navigate to={ROUTES.planning.default} />
      )}
    </DashboardContainer>
  );
};

export default ModifyPlanning;
