import { initialFormSchedule } from '@/constants';

export const useSchedule = ({
  addScheduleData,
  modifyScheduleData,
  setIsModalOpen,
  datesSelected,
  methods,
  isUpdateEvent,
}) => {
  const handleDateSelect = (selectInfo) => {
    datesSelected.current = selectInfo;
    methods.reset(initialFormSchedule);
    isUpdateEvent.current = false;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    const { endStr, startStr } = datesSelected.current ?? {};

    if (isUpdateEvent.current) {
      modifyScheduleData.mutate(data);
      handleModalClose();
      return;
    }

    const newData = {
      ...data,
      horarioEntrada: startStr,
      horarioSalida: endStr,
    };

    addScheduleData.mutate(newData);
    handleModalClose();
  };

  const handleClickEvent = (data) => {
    const { extendedProps, endStr, startStr } = data.event;
    const { idDisciplina, idEntrenador, idSalon, id } = extendedProps;

    const newData = {
      id,
      idDisciplina,
      idEntrenador,
      idSalon,
      endStr,
      startStr,
    };
    methods.reset(newData);
    isUpdateEvent.current = true;
    setIsModalOpen(true);
  };

  return { handleClickEvent, handleDateSelect, handleSubmit, handleModalClose };
};
