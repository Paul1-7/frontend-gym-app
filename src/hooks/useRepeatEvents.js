import { daysToRepeat } from '@/constants';
import { getNearestDateForDayOfWeek, getTimeDifferenceWithFormat } from '@/utils';
import { useTheme } from '@mui/material';
import { add, getDay, sub } from 'date-fns';
import { format } from 'date-fns';
import { useState, useEffect, useMemo } from 'react';

export const useRepeatEvents = ({ events = [] }) => {
  const theme = useTheme();
  const PRIMARY_COLOR = theme.palette.primary.main;
  const [eventsWithRules, setEventsWithRules] = useState([]);

  const getEventsWithRules = useMemo(() => {
    return events.map((item) => {
      const dateStart = new Date(item.horarioEntrada);
      const dateFinish = new Date(item.horarioSalida);

      const dateNowStart = getNearestDateForDayOfWeek(dateStart);
      const dateNowFinish = getNearestDateForDayOfWeek(dateFinish);

      const day = format(dateStart, 'EEEE');
      return {
        rrule: {
          freq: 'weekly',
          byweekday: [daysToRepeat?.[day]],
          dtstart: sub(dateNowStart, { months: 2 }).toISOString(),
          until: add(dateNowFinish, { months: 2 }).toISOString(),
        },
        duration: getTimeDifferenceWithFormat(dateStart, dateFinish),
        backgroundColor: PRIMARY_COLOR,
        textColor: '#fff',
        editable: false,
        overlap: false,
        extendedProps: { ...item },
        endStr: item.horarioSalida,
        end: dateFinish,
      };
    });
  }, [events, PRIMARY_COLOR]);

  useEffect(() => {
    if (!events.length) return;

    setEventsWithRules(getEventsWithRules);
  }, [events, getEventsWithRules]);

  return {
    eventsWithRules: eventsWithRules,
  };
};
