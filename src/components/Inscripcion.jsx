import { Button, Card, FormControl, Grid, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import Input from './forms/container/Input';
import Select from './forms/container/Select';
import DatePicker from './forms/container/DatePicker';
import useAxios from '../hooks/useAxios';

const initialFormInscripcion = {
  idDisciplina: '0',
  fechaInicio: new Date(),
  planPago: '',
  montoInscri: '',
};

const Inscripcion = () => {
  const [resGet, , loadingGet, axiosFetchGet] = useAxios();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inscripcion',
  });

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/disciplinas`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid item container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Inscripcion
          </Typography>
        </Grid>
        <Grid item>
          <Button
            aria-label="add"
            startIcon={<Add />}
            color="secondary"
            onClick={() => {
              append(initialFormInscripcion);
            }}
            variant="contained"
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      {fields.map((item, index) => (
        <div key={item.id} style={{ position: 'relative', marginBottom: '32px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <IconButton
              color="secondary"
              aria-label="remove an item"
              onClick={() => remove(index)}
              sx={{ position: 'absolute', top: '-25px', zIndex: 1000 }}
            >
              <HighlightOffIcon fontSize="large" />
            </IconButton>
          </div>
          <Card sx={{ position: 'relative', padding: '16px' }} variant="outlined">
            <FormControl disabled={loadingGet} sx={{ width: '100%' }}>
              <Grid container sx={{ display: 'grid' }} spacing={2}>
                <Grid item xs={12} wrap="wrap" container spacing={2}>
                  <Select name={`inscripcion.${index}.idDisciplina`} label="Disciplinas" items={resGet} isArray />
                  <Input label="Monto de inscripcion" name={`inscripcion.${index}.montoInscri`} isArray />
                </Grid>
                <Grid item xs={12} wrap="wrap" container spacing={2}>
                  <DatePicker label="Fecha de inicio" name={`inscripcion.${index}.fechaInicio`} isArray />
                  <Input label="Plan de pago" name={`inscripcion.${index}.planPago`} isArray />
                </Grid>
              </Grid>
            </FormControl>
          </Card>
        </div>
      ))}
    </>
  );
};
export default Inscripcion;
