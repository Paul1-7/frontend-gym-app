import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';

const DialogConfirmation = ({ open, handleClickClose, handleDelete, loading, textContent, id }) => (
  <Dialog open={open} maxWidth="xs" onClose={handleClickClose} fullWidth sx={{ padding: '1rem' }}>
    <DialogTitle sx={{ textAlign: 'center' }}>Ventana de confimación</DialogTitle>
    <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <DialogContentText
        sx={{
          padding: '16px',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ErrorIcon color="error" sx={{ width: '60px', height: '60px', marginBottom: '1rem' }} />
        {textContent}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingBottom: '1rem' }}>
      <Button onClick={handleClickClose} color="info" variant="outlined">
        cancelar
      </Button>
      <LoadingButton
        onClick={() => {
          handleDelete(id);
          handleClickClose();
        }}
        loading={loading}
        autoFocus
        color="error"
        variant="outlined"
        loadingIndicator="Borrando..."
      >
        si, estoy de acuerdo
      </LoadingButton>
    </DialogActions>
  </Dialog>
);

export default DialogConfirmation;

DialogConfirmation.propTypes = {
  open: PropTypes.bool,
  handleClickClose: PropTypes.func,
  handleDelete: PropTypes.func,
  loading: PropTypes.bool,
  textContent: PropTypes.string,
  id: PropTypes.string,
};
