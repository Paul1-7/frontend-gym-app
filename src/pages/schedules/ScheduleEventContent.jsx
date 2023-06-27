import { fTime } from '@/utils';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ScheduleEventContent = (props) => {
  const { startStr, endStr, extendedProps } = props.event;

  return (
    <Stack justifyContent="space-between" sx={{ alignItems: 'center' }}>
      <Typography variant="caption">{`${startStr && fTime(startStr)} - ${endStr && fTime(endStr)}`}</Typography>
      <Typography variant="caption" textAlign={'center'}>
        {extendedProps?.disciplina}
        <br />
        {extendedProps?.entrenador}
      </Typography>
    </Stack>
  );
};

ScheduleEventContent.propTypes = PropTypes.any;

export default ScheduleEventContent;
