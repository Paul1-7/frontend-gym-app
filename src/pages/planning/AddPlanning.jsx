import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormPlanning } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import schema from '@/schemas';
import PlanningForm from './PlanningForm';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addPlanning, disciplinesList, partnersListFullName, trainersList } from '@/services';
import { ROUTES } from '@/routes';
import { Grid, Typography } from '@mui/material';
import { usePlanning } from '@/hooks';

const AddPlanning = () => {
  const formMethods = useForm({
    resolver: yupResolver(schema.planning),
    defaultValues: initialFormPlanning,
    mode: 'all',
    criteriaMode: 'all',
  });

  const { addPlanningData, disciplines, partners, trainers, enabledTrainer } = usePlanning({ formMethods });

  const handleSubmit = (data) => {
    const dataParsed = { ...data, idSocio: data.idSocio.id };
    addPlanningData.mutate(dataParsed);
  };

  console.log(formMethods.formState.errors);

  return (
    <DashboardContainer data={DASHBOARD.planning.add}>
      <Grid item xs={12} wrap="wrap" container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Fecha de la clase:</span> no
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Salon:</span> no
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Capacidad de la clase:</span> no
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Cupos disponibles:</span> no
          </Typography>
        </Grid>
      </Grid>

      <Form methods={formMethods} onSubmit={handleSubmit}>
        <PlanningForm
          isLoading={addPlanningData.isLoading}
          disciplines={disciplines.data}
          partners={partners.data}
          trainers={trainers.data}
          enabledTrainer={enabledTrainer}
        />
      </Form>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, flexDirection: 'column', gap: 2 }}
      >
        {/* {data?.daysRemaining > 0 && (
          <Alert severity="info">
            El usuario tiene una suscripcion activa, con {data.daysRemaining} dias restantes
          </Alert>
        )} */}
      </Grid>
      {!addPlanningData.isLoading && !addPlanningData.isError && addPlanningData.isSuccess && (
        <Navigate to={ROUTES.planning.default} />
      )}
    </DashboardContainer>
  );
};

export default AddPlanning;
