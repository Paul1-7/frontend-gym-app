import { ITEM_DEFAULT } from '@/constants';
import { daysElapsedFromNow } from '@/utils';
import { getBOBCurrency } from '@/utils/dataHandler';
import { add } from 'date-fns';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const usePlanExpandible = ({ methods, plans = [] }) => {
  const [isExpandable, setIsExpandable] = useState(true);
  const planRef = useRef(null);
  const { idPlan, idSocio, cantidad, fechaInicio } = methods.watch();

  useEffect(() => {
    const daysElapsed = daysElapsedFromNow(fechaInicio);

    if (idPlan === ITEM_DEFAULT || idSocio?.id === ITEM_DEFAULT) {
      setIsExpandable(true);
      return;
    }

    const { setValue } = methods;

    planRef.current = plans.find((plan) => plan.id === idPlan);

    const { esRecurrente } = planRef.current;
    setIsExpandable(!esRecurrente);

    if (!esRecurrente) setValue('cantidad', 1);
    setValue('fechaFin', add(new Date(), { days: planRef.current.duracion * cantidad + daysElapsed }));
    setValue('precio', getBOBCurrency(planRef.current.precio * cantidad));
  }, [idPlan, cantidad, fechaInicio]);

  return { isExpandable };
};
