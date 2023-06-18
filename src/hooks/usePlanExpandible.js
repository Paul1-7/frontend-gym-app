import { getBOBCurrency } from '@/utils/dataHandler';
import { add } from 'date-fns';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const usePlanExpandible = ({ methods, plans = [] }) => {
  const [isExpandable, setIsExpandable] = useState(true);
  const planRef = useRef(null);
  const idPlan = methods.watch('idPlan');

  const cantidad = methods.watch('cantidad');

  useEffect(() => {
    if (idPlan === '0') {
      setIsExpandable(true);
      return;
    }

    const { setValue } = methods;

    planRef.current = plans.find((plan) => plan.id === idPlan);

    const { esExpandible } = planRef.current;
    setIsExpandable(!esExpandible);

    if (!esExpandible) setValue('cantidad', 1);
    setValue('fechaFin', add(new Date(), { days: planRef.current.duracion * cantidad }));
    setValue('precio', getBOBCurrency(planRef.current.precio * cantidad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPlan, cantidad]);

  return { isExpandable };
};
