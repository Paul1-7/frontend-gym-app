import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import ScheduleForm from './ScheduleForm';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@/schemas';
import { DASHBOARD, TEXT_MODAL, initialFormSchedule } from '@/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  activeDisciplinesList,
  activeHallsList,
  addSchedule,
  deleteSchedule,
  modifySchedule,
  schedulesListDetail,
  trainersList,
} from '@/services';
import { useRepeatEvents, useSchedule } from '@/hooks';
import SchedulePopoper from './SchedulePopoper';
import ScheduleEventContent from './ScheduleEventContent';
import rrulePlugin from '@fullcalendar/rrule';
import { DashboardContainer, DialogConfirmation } from '@/components';

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState();
  const datesSelected = useRef(null);
  const eventSelected = useRef(null);
  const isUpdateEvent = useRef(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const listSchedules = useQuery({
    queryKey: ['schedulesList'],
    queryFn: schedulesListDetail,
  });
  const { eventsWithRules } = useRepeatEvents({ events: listSchedules.data });

  const trainers = useQuery({
    queryKey: ['trainersList'],
    queryFn: trainersList,
  });

  const disciplines = useQuery({
    queryKey: ['disciplinesList'],
    queryFn: activeDisciplinesList,
  });
  const halls = useQuery({
    queryKey: ['hallsList'],
    queryFn: activeHallsList,
  });

  const addScheduleData = useMutation({
    mutationFn: (data) => {
      return addSchedule({ data });
    },
    onSuccess: listSchedules.refetch,
  });
  const modifyScheduleData = useMutation({
    mutationFn: (data) => {
      return modifySchedule({ data, id: data.id });
    },
    onSuccess: listSchedules.refetch,
  });

  const deleteScheduleData = useMutation({
    mutationFn: (id) => deleteSchedule({ id }),
    onSuccess: listSchedules.refetch,
  });

  const methods = useForm({
    resolver: yupResolver(schema.horarios),
    defaultValues: initialFormSchedule,
    mode: 'all',
    criteriaMode: 'all',
  });

  const handleDelete = (id) => {
    deleteScheduleData.mutate(id);
  };

  const { handleModalClose, handleSubmit, handleDateSelect, handleClickEvent } = useSchedule({
    addScheduleData,
    modifyScheduleData,
    setIsModalOpen,
    datesSelected,
    methods,
    isUpdateEvent,
  });

  return (
    <DashboardContainer data={DASHBOARD.schedules.default}>
      <DialogConfirmation
        open={isDialogOpen}
        handleClickClose={closeDialog}
        textContent={TEXT_MODAL.delete}
        handleDelete={handleDelete}
        loading={deleteScheduleData.isLoading}
        id={methods.watch('id')}
      />
      <SchedulePopoper anchorEl={anchorEl} setAnchorEl={setAnchorEl} data={eventSelected.current} />
      <ScheduleForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        disciplines={disciplines.data}
        trainers={trainers.data}
        halls={halls.data}
        methods={methods}
        onSubmit={handleSubmit}
        isUpdateEvent={isUpdateEvent.current}
        openDialog={openDialog}
      />
      <FullCalendar
        plugins={[interactionPlugin, rrulePlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={eventsWithRules}
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
        timeZone="local"
        aspectRatio={2}
        selectable
        selectMirror
        selectOverlap={false}
        select={handleDateSelect}
        eventClick={handleClickEvent}
        eventMouseEnter={(info) => {
          eventSelected.current = info.event;
          setAnchorEl(info.el);
        }}
        eventMouseLeave={() => {
          setAnchorEl(null);
        }}
        eventContent={ScheduleEventContent}
      />
    </DashboardContainer>
  );
};

export default Schedules;
