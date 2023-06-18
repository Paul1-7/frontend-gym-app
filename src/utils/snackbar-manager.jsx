import { useSnackbar } from 'notistack';

let useSnackbarRef;
export const SnackbarUtilitiesConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const SnackbarUtilities = {
  success(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'success' });
  },
  error(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'error' });
  },
  info(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'info' });
  },
  warning(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'warning' });
  },
};
