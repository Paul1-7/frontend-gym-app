import PropTypes from 'prop-types';
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { Input } from '@/components';

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

const ScheduleForm = ({ isOpen, onClose, isLoading }) => {
  return (
    <Modal open={isOpen}>
      <Box sx={{ ...style, width: 300 }}>
        <Typography textAlign={'center'} variant="h5" mb={2}>
          Agregar nuevo horario
        </Typography>
        <Grid item xs={12}>
          <Input label="disciplina" name="disciplina" />
        </Grid>
        <Grid item xs={12}>
          <Input label="entrenador" name="entrenador" />
        </Grid>
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
    </Modal>
  );
};

ScheduleForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ScheduleForm;
