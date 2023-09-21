import { ITEM_DEFAULT } from '@/constants';
import { useEffect } from 'react';

export const useLastSubscription = ({ socio, refetch, lastSubscription }) => {
  useEffect(() => {
    if (socio.id === ITEM_DEFAULT) return;
    refetch();
  }, [socio, lastSubscription]);

  return {
    data: lastSubscription,
  };
};
