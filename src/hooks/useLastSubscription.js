import { useEffect } from 'react';

export const useLastSubscription = ({ socio, refetch, lastSubscription }) => {
  useEffect(() => {
    if (socio.id === '0') return;
    refetch();
  }, [socio, lastSubscription]);

  return {
    data: lastSubscription,
  };
};
