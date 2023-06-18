import Axios from 'apis';
import { Backdrop, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import useAxios from 'hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { FormProvider, useForm } from 'react-hook-form';
import Page from '@/components/Page';
import Select from '@/components/forms/container/Select';
import { useEffect, useState } from 'react';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  WeekView,
  AppointmentForm,
  AppointmentTooltip,
  Resources,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import { getRandomColor } from '@/constants/schedule';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Appointment, AppointmentContent } from './styles';

const initialForm = {
  idSalon: '0',
};

const currentDate = '2017-05-01';

const customDataSalones = ({ data }) => {
  const newData = data.filter(({ estado }) => estado !== 0);

  return { data: newData };
};

const customDataDisciplinas = ({ data }) => {
  const newData = data
    .filter(({ estado }) => estado !== 0)
    .map(({ id, nombre }) => ({
      id,
      text: nombre,
      color: getRandomColor(),
    }));

  return { data: newData };
};

const customDataEmpleados = ({ data }) => {
  const newData = data.map(({ id, nombre, apellidoP, apellidoM }) => ({
    id,
    text: `${nombre} ${apellidoP} ${apellidoM}`,
    color: getRandomColor(),
  }));

  return { data: newData };
};

const FormularioHorario = () => {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetEmpleado, , loadingGetEmpleado, axiosFetchGetEmpleado] = useAxios(customDataEmpleados);
  const [resGetDisciplinas, , loadingGetDisciplinas, axiosFetchGetDisciplinas] = useAxios(customDataDisciplinas);
  const [resGetSalones, , loadingGetSalones, axiosFetchGetSalones] = useAxios(customDataSalones);
  const [values, setValues] = useState({
    data: [],

    currentDate,
  });

  useEffect(() => {
    if (!resGetEmpleado.length || !resGetDisciplinas.length) return;

    setValues({
      ...values,
      resources: [
        {
          fieldName: 'disciplinas',
          title: 'Disciplinas',
          instances: resGetDisciplinas,
        },
        {
          fieldName: 'empleados',
          title: 'Empleados',
          instances: resGetEmpleado,
        },
      ],
    });
  }, [resGetEmpleado, resGetDisciplinas]);

  const methods = useForm({
    resolver: yupResolver(schema.horarios),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  useEffect(() => {
    axiosFetchGetEmpleado({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/empleados`,
    });
    axiosFetchGetDisciplinas({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/disciplinas`,
    });
    axiosFetchGetSalones({
      axiosInstance: Axios,
      method: 'GET',
      url: `/api/v1/salones`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    const idRol = data.roles.map((id) => ({ idRol: id }));
    data = { ...data, roles: idRol };

    axiosFetchPost({
      axiosInstance: Axios,
      method: 'put',
      url: '/api/v1/horarios',
      requestConfig: {
        ...data,
      },
    });
  };
  const commitChanges = ({ added, changed }) => {
    console.log('TCL: commitChanges -> data', changed);

    // console.log(added);
    // console.log(changed);
    // console.log(deleted);

    if (added) {
      const newData = { ...added, id: new Date().getTime().toString() };
      setValues({ ...values, data: [...values.data, newData] });
    }

    if (changed) {
      const id = Object.keys(changed)[0];
      const newValues = Object.values(changed)[0];
      console.log('TCL: commitChanges -> newValues', newValues);

      const newData = values.data.map((item) => (item.id !== id ? item : { ...item, ...newValues }));
      console.log('TCL: commitChanges -> newData', newData);

      // setValues({ ...values, data: newData });
    }
    //   const newValue = { ...item, ...changed };

    //   setValues({
    //     ...values,
    //     data: [...values.data, newValue],
    //   });
    // }

    // setValues((state) => {
    //   console.log('TCL: commitChanges -> state', state);

    //   let { data } = state;

    //   if (changed) {
    //     data = data.map((appointment) =>
    //       changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
    //     );
    //   }
    //   if (deleted !== undefined) {
    //     data = data.filter((appointment) => appointment.id !== deleted);
    //   }
    //   return { data };
    // });
  };

  return (
    <Page title="Agregar horario">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingGetEmpleado || loadingGetDisciplinas || loadingGetSalones}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container sx={{ padding: '16px', position: 'relative' }}>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: '2rem' }}>
          Actualizar horario
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <Grid container sx={{ display: 'grid' }} spacing={2}>
              <Grid item xs={12} wrap="wrap" container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Select name="idSalon" label="Salones" items={resGetSalones} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="outlined" component={Link} to="/dashboard/salones/nuevo" startIcon={<Add />}>
                    Nuevo salon
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Scheduler data={values.data} locale="es-BO" firstDayOfWeek={1}>
              <EditingState onCommitChanges={commitChanges} />
              <ViewState currentDate={values.currentDate} />
              <IntegratedEditing />

              <WeekView startDayHour={6} endDayHour={22} />
              <Appointments appointmentComponent={Appointment} appointmentContentComponent={AppointmentContent} />
              <Resources data={values.resources} />
              <EditRecurrenceMenu />

              <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
              <AppointmentForm />
            </Scheduler>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <LoadingButton
                type="submit"
                loading={loadingPost}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                color="secondary"
                variant="outlined"
              >
                Guardar
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </Container>
    </Page>
  );
};
export default FormularioHorario;
