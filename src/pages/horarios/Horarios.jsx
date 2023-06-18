import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import ScheduleForm from './ScheduleForm';
import { useRef } from 'react';
import { useEffect } from 'react';
import { RRule, datetime } from 'rrule';
import { Form, Popover } from '@/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@/schemas';
import ScheduleEventContent from './ScheduleEventContent';
import { initialFormSchedule } from '@/constants';

const Horarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [events, setEvents] = useState([
    {
      title: 'event 1',
      start: '2023-06-14T17:00:00-04:00',
      end: '2023-06-14T18:00:00-04:00',
      backgroundColor: '#FF0000',
      textColor: '#fff',
      display: 'block',
      editable: true,
      overlap: false,
    },
    {
      title: 'event 1',
      start: '2023-06-14T19:00:00-04:00',
      end: '2023-06-14T21:00:00-04:00',
      backgroundColor: '#FF00D0',
      textColor: '#fff',
      display: 'block',
      editable: true,
      overlap: false,
    },
  ]);
  const datesSelected = useRef(null);

  const methods = useForm({
    resolver: yupResolver(schema.socios),
    defaultValues: initialFormSchedule,
    mode: 'all',
    criteriaMode: 'all',
  });

  const handleDateSelect = (selectInfo) => {
    datesSelected.current = selectInfo;

    console.log('TCL: handleDateSelect -> selectInfo', selectInfo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Generar eventos repetidos usando rrule
    const rule = new RRule({
      freq: RRule.WEEKLY, // Repetir semanalmente
      byweekday: [RRule.WE],
      dtstart: datetime(2023, 6, 1, 12, 30), // Fecha de inicio
      until: datetime(2023, 7, 16, 12, 30),
    });

    const repeatedEvents = rule.all().map((date) => ({
      title: 'Evento repetido',
      start: date,
      end: date,
      backgroundColor: '#FF0000',
      textColor: '#fff',
      display: 'block',
      editable: true,
      overlap: false,
      extendedProps: { description: 'Descripcion' },
    }));
    console.log('TCL: Horarios -> repeatedEvents', repeatedEvents);

    setEvents((prev) => [...prev, ...repeatedEvents]);
  }, []);

  return (
    <div>
      <Popover anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        sssd
      </Popover>
      <Form methods={methods} onSubmit={() => console.log('submit')}>
        <ScheduleForm isOpen={isModalOpen} onClose={handleModalClose} />
      </Form>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        slotMinTime={'06:00:00'}
        allDaySlot={false}
        locale={esLocale}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
        }}
        aspectRatio={2}
        selectable
        selectMirror
        selectOverlap={false}
        select={handleDateSelect}
        eventClick={(info) => {
          console.log('TCL: modifica -> info', info);
        }}
        eventMouseEnter={(info) => {
          console.log('TCL: eventMouseEnter -> info', info);

          setAnchorEl(info.el);
        }}
        eventMouseLeave={() => {
          setAnchorEl(null);
        }}
        eventContent={(info) => {
          console.log('TCL: info', info);
          return <ScheduleEventContent data={info.event} />;
        }}
        eventClassNames={}
      />
    </div>
  );
};

export default Horarios;
