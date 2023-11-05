import { ITEM_DEFAULT } from '@/constants';
import { addPlanning, partnersListFullName, planningList, schedulesListItems } from '@/services';
import { getNearestDateForDayOfWeek } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRef } from 'react';
import { useEffect } from 'react';

export const usePlanning = ({ formMethods }) => {
  const dataWatched = formMethods.watch();
  const { id, idHorario, idSocio, capacidad } = dataWatched;

  const querySchedules = useRef('');
  const queryPartners = useRef('');
  const queryPlanning = useRef('');
  const selectedSchedule = useRef(null);

  const addPlanningData = useMutation({
    mutationFn: (data) => {
      return addPlanning({ data });
    },
  });

  const partners = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersListFullName(queryPartners.current),
    cacheTime: 0,
  });

  const schedules = useQuery({
    queryKey: ['schedules'],
    queryFn: () => schedulesListItems(querySchedules.current),
  });

  const planning = useQuery({
    queryKey: ['plannings'],
    queryFn: () => planningList(queryPlanning.current),
    enabled: false,
  });
  const isSameId = planning.data?.every(({ id: idPlanning }) => idPlanning === id);

  const idSocios = idSocio.map(({ id }) => id);
  const repeatedParticipants = planning.data?.[0]?.detalle?.filter(
    (item) => idSocios.includes(item.idSocio) && id !== planning.data?.[0]?.id
  );

  useEffect(() => {
    formMethods.setValue('cupoDisponible', capacidad - idSocio.length);
  }, [capacidad, idSocio]);

  useEffect(() => {
    const { id, horarioEntrada, salon } = idHorario;
    if (id === ITEM_DEFAULT) return;

    const selectedDate = new Date(horarioEntrada);
    const newDate = getNearestDateForDayOfWeek(selectedDate);
    selectedSchedule.current = idHorario;

    queryPlanning.current = `?idHorario=${id}&fecha=${newDate.toISOString()}`;
    planning.refetch();
    formMethods.setValue('fecha', newDate);
    formMethods.setValue('hora', format(newDate, 'HH:mm'));
    formMethods.setValue('capacidad', salon?.capacidad ?? 1);
  }, [idHorario, schedules.data]);

  return {
    partners,
    schedules,
    addPlanningData,
    selectedSchedule: selectedSchedule.current,
    isPlanningUnique: !!planning.data?.length && !isSameId,
    availableQuotas: capacidad - idSocio.length,
    roomCapacity: capacidad,
    repeatedParticipants,
  };
};
