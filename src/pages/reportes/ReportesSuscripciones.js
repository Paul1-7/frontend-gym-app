/* eslint-disable prefer-destructuring */
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { Stack, Container, Typography, Grid } from '@mui/material';
import Page from 'components/Page';
import useAxios from 'hooks/useAxios';
import Axios from 'apis';
import { toast, ToastContainer } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import Select from 'components/forms/container/Select';
import RadioGroup from 'components/forms/container/RadioGroup';
import { ITEMS_RADIO_REPORTES_SUSC, ITEMS_SUSCRIPCIONES_REPORTE } from 'constants/inputs';
import { LoadingButton } from '@mui/lab';
import { Download } from '@mui/icons-material';
import DatePicker from 'components/forms/container/DatePicker';
import { add } from 'date-fns';
import reporteInventario from 'utils/reporteInventario';
import { getBOBCurrency } from 'utils/dataHandler';

const initialForm = {
  tipo: '0',
  esRango: '0',
  fechaInicio: new Date(),
  fechaFin: add(new Date(), { days: 1 }),
};

const urlTypeToReport = {
  1: '/reporte-default',
  2: '/reporte-renovacion',
  3: '/reporte-resultados',
};

const optionsPDF = {
  logo: {
    src: 'public/static/gym-logo.png',
    type: 'PNG', // optional, when src= data:uri (nodejs case)
    width: 25, // aspect ratio = width/height
    height: 13.66,
    margin: {
      top: 0, // negative or positive num, from the current position
      left: 0, // negative or positive num, from the current position
    },
  },
  stamp: {
    inAllPages: true, // by default = false, just in the last page
    src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
    type: 'JPG', // optional, when src= data:uri (nodejs case)
    width: 20, // aspect ratio = width/height
    height: 20,
    margin: {
      top: 0, // negative or positive num, from the current position
      left: 0, // negative or positive num, from the current position
    },
  },
  business: {
    name: 'Gimnacio',
  },
};

const columnsPDF = {
  1: ['N°', 'socio', 'ci', 'fecha de inicio', 'fecha de finalización', 'plan', 'cantidad', 'monto cancelado'],
  2: ['N°', 'número de suscripciones', 'socio', 'ci', 'fecha de suscripción', 'plan'],
};

export default function ReporteSuscripciones() {
  const [resGet, errorGet, loadingGet, axiosFetchGet, , , controllerGet] = useAxios();
  const [isDisabled, setIsDisabled] = useState(false);
  const documentType = useRef();
  const location = useLocation();

  const methods = useForm({
    resolver: yupResolver(schema.reporteSuscripciones),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  const esRango = methods.watch('esRango');
  const tipo = methods.watch('tipo');

  useEffect(() => {
    console.log({ esRango }, { tipo });
    if (tipo === '3') {
      setIsDisabled(true);
      return;
    }

    setIsDisabled(esRango !== '0');
  }, [esRango, tipo]);

  useEffect(() => {
    if (!controllerGet) return;

    if (!resGet.length) {
      toast.warning('No existe datos para el criterio seleccionado', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    let data;
    if (tipo === '1') {
      data = resGet.map(({ fechaInicio, fechaFin, cantidad, montoCancelado, socio, plan }, index) => [
        index + 1,
        `${socio.nombre} ${socio.apellidoP} ${socio.apellidoM}`,
        socio.ci,
        new Date(fechaInicio).toLocaleDateString(),
        new Date(fechaFin).toLocaleDateString(),
        plan.nombre,
        cantidad,
        getBOBCurrency(montoCancelado),
      ]);
    }
    if (tipo === '2') {
      data = resGet.map(({ numSuscrip, nombre, apellidoP, fechaInicio, apellidoM, ci, nombrePlan }, index) => [
        index + 1,
        numSuscrip,
        `${nombre} ${apellidoP} ${apellidoM}`,
        ci,
        new Date(fechaInicio).toLocaleDateString(),
        nombrePlan,
      ]);
    }
    console.log(data);
    optionsPDF.data = data;
    optionsPDF.columns = columnsPDF[tipo];

    if (documentType.current === 'PDF') reporteInventario(optionsPDF);
  }, [resGet]);

  const onSubmit = ({ tipo, esRango, fechaInicio, fechaFin }) => {
    const url = `/api/v1/suscripciones${urlTypeToReport[tipo]}${
      esRango !== '1' ? `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}` : ``
    }`;
    console.log(url);
    axiosFetchGet({
      axiosInstance: Axios,
      method: 'get',
      url,
    });
  };

  useEffect(() => {
    if (!loadingGet && errorGet)
      toast.error(errorGet.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <Page title="Reportes">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reporte de suscripciones
          </Typography>
        </Stack>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container sx={{ display: 'grid' }} spacing={2}>
              <Grid item xs={12} wrap="wrap" container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Select items={ITEMS_SUSCRIPCIONES_REPORTE} label="Seleccione el tipo de reporte" name="tipo" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RadioGroup name="esRango" label="Seleccione una opción" items={ITEMS_RADIO_REPORTES_SUSC} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker label={'Seleccione la fecha de inicio'} name="fechaInicio" disabled={isDisabled} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker label={'Seleccione la fecha final'} name="fechaFin" disabled={isDisabled} />
                </Grid>
              </Grid>
            </Grid>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
              <LoadingButton
                type="submit"
                loading={loadingGet}
                loadingPosition="start"
                startIcon={<Download />}
                color="secondary"
                variant="outlined"
                onClick={() => {
                  documentType.current = 'PDF';
                }}
              >
                reporte en PDF
              </LoadingButton>
              <LoadingButton
                type="submit"
                loading={loadingGet}
                loadingPosition="start"
                startIcon={<Download />}
                color="secondary"
                variant="outlined"
                onClick={() => {
                  documentType.current = 'CSV';
                }}
              >
                reporte en CSV
              </LoadingButton>
            </div>
          </form>
        </FormProvider>

        <ToastContainer draggablePercent={60} />
      </Container>
    </Page>
  );
}
