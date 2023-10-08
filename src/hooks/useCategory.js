import { ITEM_DEFAULT } from '@/constants';
import { disciplinesList, equipmentsList, productsList } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useCategory = ({ formMethods }) => {
  const itemsTypes = [disciplinesList, equipmentsList, productsList];
  const selectedType = formMethods.watch('tipo');

  const typeList = useQuery({
    queryKey: ['selectedType'],
    queryFn: () => itemsTypes[selectedType](),
    enabled: false,
  });

  useEffect(() => {
    if (selectedType === ITEM_DEFAULT) return;
    typeList.refetch();
  }, [selectedType]);

  return {
    typeList,
  };
};
