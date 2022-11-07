import { Button, Card, FormControl, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import Input from './forms/container/Input';
import Select from './forms/container/Select';
import useAxios from '../hooks/useAxios';
import axios from '../apis';

const initialForm = {
  idDisciplina: '0',
  horarioEntrada: '',
  horarioSalida: '',
};

const Horarios = ({ data = [] }) => {
  const [resGetDisci, , loadingGetDisci, axiosFetchGetDisci] = useAxios();
  const [resGetHorarios, errorGetHorarios, loadingGetHorarios, axiosFetchGetHorarios] = useAxios();

  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'horarios',
  });

  useEffect(() => {
    axiosFetchGetDisci({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/disciplinas`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = watch('idUsuario');

    if (id !== '0') {
      axiosFetchGetHorarios({
        axiosInstance: axios,
        method: 'GET',
        url: `/api/v1/horarios/${id}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('idUsuario')]);

  useEffect(() => {
    if (resGetHorarios.length > 0 && !errorGetHorarios) {
      // const keys = Object.keys(initialForm);
      // const objectArray = Object.entries(resGetEmpleado);

      // if (resGetHorarios.length > 0 && !errorGetHorarios) {
      //   const idDisArray = resGetHorarios.map((items) => idDisciplina);
      //   resGetDisci.forEach(({ nombre, id: idSuc }, index) => {
      //     // console.log(data[index]);
      //     if (idDisArray.includes(idSuc)) append(data[index]);
      //     else );
      //   });
      // }
      /* eslint-disable */
      for (const [key, value] of objectArray) {
        if (keys.includes(key)) {
          // methods.setValue(key,, { shouldValidate: true });
          append();
        }
      }
      /* eslint-enable */
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [resGetHorarios]);

  return (
    <>
      <Grid item container alignItems="center" spacing={2} sx={{ marginBottom: '1rem' }}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Horarios
          </Typography>
        </Grid>
        <Grid item>
          <Button
            aria-label="add"
            startIcon={<Add />}
            color="secondary"
            onClick={() => {
              append(initialForm);
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
            <FormControl disabled={loadingGetDisci} sx={{ width: '100%' }}>
              <Grid container sx={{ display: 'grid' }} spacing={2}>
                <Grid item xs={12} wrap="wrap" container spacing={2}>
                  <Select name={`horarios.${index}.idDisciplina`} label="Disciplinas" items={resGetDisci} isArray />
                  <Input label="Horario de entrada" name={`horarios.${index}.horarioEntrada`} isArray />
                </Grid>
                <Grid item xs={12} wrap="wrap" container spacing={2}>
                  <Input label="Horario de salida" name={`horarios.${index}.horarioSalida`} isArray />
                </Grid>
              </Grid>
            </FormControl>
          </Card>
        </div>
      ))}
    </>
  );
};
export default Horarios;
