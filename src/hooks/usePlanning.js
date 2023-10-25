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
  const { id, idDisciplina, dia, idEntrenador, idHorario, hora, fecha, idSocio, capacidad } = dataWatched;
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
    queryFn: () => disciplinesList(),
    cacheTime: 0,
  });

  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersListFullName(queryPartners.current),
    cacheTime: 0,
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
  const isSameId = planning.data?.every(({ id: idPlanning }) => idPlanning === id);

  useEffect(() => {
    formMethods.setValue('cupoDisponible', capacidad - idSocio.length);
  }, [capacidad, idSocio]);

  useEffect(() => {
    formMethods.setValue('idEntrenador', { nombre: 'Ninguno', id: ITEM_DEFAULT });
    formMethods.setValue('idHorario', ITEM_DEFAULT);
    formMethods.setValue('idSocio', [{ nombre: 'Ninguno', id: ITEM_DEFAULT }]);
  }, [idDisciplina, dia]);

  useEffect(() => {
    if (!idEntrenador) return;

    const isDefaultValue = dia === ITEM_DEFAULT || idDisciplina === ITEM_DEFAULT;

    const isTrainerDefaultValue = compare(idEntrenador, DEFAULT_OBJECT) || isDefaultValue;

    const isScheduleDefaultValue = idHorario === ITEM_DEFAULT || isTrainerDefaultValue;

    setEnabledFields((prev) => ({
      ...prev,
      trainers: isDefaultValue,
      schedules: isTrainerDefaultValue,
      partners: isScheduleDefaultValue,
    }));
  }, [idDisciplina, dia, idEntrenador?.id, idHorario]);

  useEffect(() => {
    if (!idEntrenador) return;
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
  }, [enabledFields, idEntrenador]);

  useEffect(() => {
    if (!enabledFields.trainers) return;
    formMethods.setValue('idEntrenador', DEFAULT_OBJECT);
    formMethods.setValue('idHorario', ITEM_DEFAULT);
    formMethods.setValue('idSocio', [DEFAULT_OBJECT]);
  }, [enabledFields.trainers]);

  useEffect(() => {
    if (idHorario === ITEM_DEFAULT || !schedules.data) return;
    selectedSchedule.current = schedules.data.find(({ id }) => id === idHorario);

    if (!selectedSchedule.current) return;

    const selectedDate = new Date(selectedSchedule.current.horarioEntrada);
    const newDate = getNearestDateForDayOfWeek(selectedDate);

    queryPlanning.current = `?hora=${format(newDate, 'HH:mm')}&fecha=${newDate.toISOString()}`;
    planning.refetch();
    formMethods.setValue('fecha', newDate);
    formMethods.setValue('hora', format(newDate, 'HH:mm'));
    formMethods.setValue('capacidad', selectedSchedule.current?.salon?.capacidad ?? 1);
  }, [idHorario, schedules.data]);

  return {
    trainers,
    partners,
    disciplines,
    schedules,
    addPlanningData,
    enabledFields,
    selectedSchedule: selectedSchedule.current,
    isPlanningUnique: !!planning.data?.length && !isSameId,
    availableQuotas: capacidad - idSocio.length,
    roomCapacity: capacidad,
  };
};
