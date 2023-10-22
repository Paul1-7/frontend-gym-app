import { add } from 'date-fns';
import { useEffect } from 'react';

export const useProducts = ({ formMethods }) => {
  const watchedValues = formMethods.watch();
  const { tieneVencimiento } = watchedValues;
  const hasExpiration = tieneVencimiento === 'true';

  useEffect(() => {
    formMethods.setValue('fechaVencimiento', add(new Date(), { days: 5 }));
  }, [tieneVencimiento]);

  return {
    hasExpiration,
  };
};
