import { fTime } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ScheduleEventContent = ({ data }) => {
  const { startStr, endStr, title, extendedProps } = data;
  console.log('TCL: ScheduleEventContent -> data', data);
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ overflow: 'hidden' }}>
      <Typography variant="caption">{`${startStr && fTime(startStr)} - ${endStr && fTime(endStr)}`}</Typography>
      <Typography>{title}</Typography>
      <span>{extendedProps?.entrenador}</span>
      <Typography sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Box sx={{ backgroundColor: '#ffc107', width: '15px', height: '15px', borderRadius: '50%' }}></Box>entrasd
      </Typography>
    </Stack>
  );
};

ScheduleEventContent.propTypes = {
  data: PropTypes.object,
};

export default ScheduleEventContent;
