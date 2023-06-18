import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { ERRORS } from '@/constants';

const useSnackBarMessage = ({ errors = [], successes = [], isLoading = [] }) => {
  const { enqueueSnackbar } = useSnackbar();

  const getIsLoading = () => {
    return isLoading.some((item) => item);
  };

  useEffect(() => {
    errors.some((error) => {
      if (getIsLoading()) return true;

      const isErrorFetch = error?.status === 'FETCH_ERROR';
      let msg = error?.message;

      if (!msg && isErrorFetch) msg = ERRORS.FETCH_ERROR;

      if (msg)
        enqueueSnackbar(msg, {
          variant: 'error',
        });

      return false;
    });
  }, [errors, isLoading]);

  useEffect(() => {
    successes.some((success) => {
      if (getIsLoading()) return false;

      if (success)
        enqueueSnackbar(success, {
          variant: 'success',
        });
      return false;
    });
  }, [successes, isLoading]);
};

export default useSnackBarMessage;
