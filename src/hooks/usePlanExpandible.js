import { getBOBCurrency } from '@/utils/dataHandler';
import { add } from 'date-fns';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const usePlanExpandible = ({ methods, plans = [], daysRemaining = 0 }) => {
  const [isExpandable, setIsExpandable] = useState(true);
  const planRef = useRef(null);
  const idPlan = methods.watch('idPlan');
  const idSocio = methods.watch('idSocio');
  const cantidad = methods.watch('cantidad');

  useEffect(() => {
    console.log('comienzo');
    if (idPlan === '0' || idSocio?.id === '0') {
      setIsExpandable(true);
      return;
    }

    const { setValue } = methods;

    planRef.current = plans.find((plan) => plan.id === idPlan);

    const { esExpandible } = planRef.current;
    setIsExpandable(!esExpandible);

    if (!esExpandible) setValue('cantidad', 1);
    console.log('llega');
    setValue('fechaFin', add(new Date(), { days: planRef.current.duracion * cantidad + daysRemaining }));
    setValue('precio', getBOBCurrency(planRef.current.precio * cantidad));
  }, [idPlan, cantidad, daysRemaining]);

  return { isExpandable };
};
