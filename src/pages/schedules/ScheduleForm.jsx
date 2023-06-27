import PropTypes from 'prop-types';
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { Form, Select } from '@/components';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ScheduleForm = ({
  isOpen,
  onClose,
  isLoading,
  disciplines,
  trainers,
  halls,
  methods,
  onSubmit,
  isUpdateEvent,
  openDialog,
}) => {
  return (
    <Modal open={isOpen}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography textAlign={'center'} variant="h5" mb={2}>
            {isUpdateEvent ? 'Modificar horario' : 'Agregar nuevo horario'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select label="disciplina" name="idDisciplina" items={disciplines} />
            </Grid>
            <Grid item xs={12}>
              <Select label="entrenador" name="idEntrenador" items={trainers} />
            </Grid>
            <Grid item xs={12}>
              <Select label="salon" name="idSalon" items={halls} />
            </Grid>
          </Grid>
          {isUpdateEvent && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                openDialog();
                onClose();
              }}
              sx={{ mb: 4, mt: 1 }}
            >
              Eliminar horario
            </Button>
          )}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<Save />}
              color="secondary"
              variant="outlined"
            >
              Guardar
            </LoadingButton>
          </Stack>
        </Box>
      </Form>
    </Modal>
  );
};

ScheduleForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
  trainers: PropTypes.array,
  disciplines: PropTypes.array,
  halls: PropTypes.array,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdateEvent: PropTypes.bool,
};

export default ScheduleForm;
