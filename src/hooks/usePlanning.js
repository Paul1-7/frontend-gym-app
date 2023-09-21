import { ITEM_DEFAULT } from '@/constants';
import { addPlanning, disciplinesList, partnersListFullName, trainersList } from '@/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const initialEnabledFields = {
  trainers: true,
  schedules: true,
};

export const usePlanning = ({ formMethods }) => {
  const dataWatched = formMethods.watch();
  const { idDisciplina, dia } = dataWatched;
  const [enabledFields, setEnabledFields] = useState(initialEnabledFields);
  const queryTrainers = useRef('');

  const addPlanningData = useMutation({
    mutationFn: (data) => {
      return addPlanning({ data });
    },
  });

  const disciplines = useQuery({
    queryKey: ['disciplinesList'],
    queryFn: disciplinesList,
  });

  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersListFullName(),
  });

  const trainers = useQuery({
    queryKey: ['trainersList'],
    queryFn: () => trainersList(queryTrainers.current),
    enabled: false,
  });

  useEffect(() => {
    const isDefaultValue = dia === ITEM_DEFAULT || idDisciplina === ITEM_DEFAULT;

    setEnabledFields((prev) => ({ ...prev, trainers: isDefaultValue }));
  }, [idDisciplina, dia]);

  useEffect(() => {
    if (!enabledFields.trainers) {
      console.log('ENTRA');
      formMethods.setValue('idEntrenador', ITEM_DEFAULT);
      queryTrainers.current = `?$horarios.id_disciplina$=${idDisciplina}&$horarios.dia$=${dia}`;
      trainers.refetch();
    }
  }, [enabledFields]);

  return {
    trainers,
    partners,
    disciplines,
    addPlanningData,
    enabledTrainer: enabledFields.trainers,
  };
};
