import { ITEM_DEFAULT } from '@/constants';
import {
  addPlanning,
  disciplinesList,
  partnersListFullName,
  planningList,
  schedulesListItems,
  trainersList,
} from '@/services';
import { getNearestDateForDayOfWeek } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import compare from 'just-compare';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const initialEnabledFields = {
  trainers: true,
  schedules: true,
  partners: true,
};

const DEFAULT_OBJECT = { nombre: 'Ninguno', id: ITEM_DEFAULT };

export const usePlanning = ({ formMethods }) => {
  const dataWatched = formMethods.watch();
  const { idDisciplina, dia, idEntrenador, idHorario, hora, fecha, idSocio } = dataWatched;
  const [enabledFields, setEnabledFields] = useState(initialEnabledFields);
  const queryTrainers = useRef('');
  const querySchedules = useRef('');
  const queryPartners = useRef('');
  const queryPlanning = useRef('');
  const selectedSchedule = useRef(null);

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
    queryFn: () => partnersListFullName(queryPartners.current),
  });

  const trainers = useQuery({
    queryKey: ['trainersList'],
    queryFn: () => trainersList(queryTrainers.current),
    enabled: false,
  });

  const schedules = useQuery({
    queryKey: ['schedules'],
    queryFn: () => schedulesListItems(querySchedules.current),
    enabled: false,
  });

  const planning = useQuery({
    queryKey: ['plannings'],
    queryFn: () => planningList(queryPlanning.current),
    enabled: false,
  });

  useEffect(() => {
    const isDefaultValue = dia === ITEM_DEFAULT || idDisciplina === ITEM_DEFAULT;

    const isTrainerDefaultValue = compare(idEntrenador, DEFAULT_OBJECT) || isDefaultValue;

    const isScheduleDefaultValue = idHorario === ITEM_DEFAULT || isTrainerDefaultValue;

    setEnabledFields((prev) => ({
      ...prev,
      trainers: isDefaultValue,
      schedules: isTrainerDefaultValue,
      partners: isScheduleDefaultValue,
    }));
  }, [idDisciplina, dia, idEntrenador.id, idHorario]);

  useEffect(() => {
    if (!enabledFields.trainers) {
      queryTrainers.current = `?$horarios.id_disciplina$=${idDisciplina}&$horarios.dia$=${dia}`;
      trainers.refetch();
    }

    if (!enabledFields.schedules) {
      querySchedules.current = `?id_entrenador=${idEntrenador.id}&id_disciplina=${idDisciplina}`;
      schedules.refetch();
    }

    if (!enabledFields.partners) {
      queryPartners.current = `?$programaciones.fecha$={[Op.ne]:${fecha.toISOString()}}&$programaciones.hora$={[Op.ne]:${hora}}`;
      partners.refetch();
    }
  }, [enabledFields]);

  useEffect(() => {
    console.log('entra');
    formMethods.setValue('cupoDisponible', idSocio.length);
  }, [idSocio?.length]);

  useEffect(() => {
    if (!enabledFields.trainers) return;
    formMethods.setValue('idEntrenador', DEFAULT_OBJECT);
    formMethods.setValue('idHorario', ITEM_DEFAULT);
    formMethods.setValue('idSocio', [DEFAULT_OBJECT]);
  }, [enabledFields.trainers]);

  useEffect(() => {
    if (idHorario === ITEM_DEFAULT) return;
    selectedSchedule.current = schedules.data.find(({ id }) => id === idHorario);

    const selectedDate = new Date(selectedSchedule.current.horarioEntrada);
    const newDate = getNearestDateForDayOfWeek(selectedDate);

    queryPlanning.current = `?hora=${format(newDate, 'HH:mm')}&fecha=${newDate.toISOString()}`;
    planning.refetch();
    formMethods.setValue('fecha', newDate);
    formMethods.setValue('hora', format(newDate, 'HH:mm'));
    formMethods.setValue('capacidad', selectedSchedule?.salon?.capacidad ?? 1);
  }, [idHorario]);

  return {
    trainers,
    partners,
    disciplines,
    schedules,
    addPlanningData,
    enabledFields,
    selectedSchedule: selectedSchedule.current,
    isPlanningUnique: !!planning.data?.length,
  };
};
