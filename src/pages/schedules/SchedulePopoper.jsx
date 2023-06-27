import PropTypes from 'prop-types';
import { Popover } from '@/components';
import { Typography } from '@mui/material';

const SchedulePopoper = ({ anchorEl, setAnchorEl, data }) => {
  const { entrenador, disciplina, salon } = data?.extendedProps ?? {};
  return (
    <Popover anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
      <Typography variant="caption" textAlign={'center'}>
        <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{disciplina} </span> <br />
        {entrenador} <br />
        {salon} <br />
      </Typography>
    </Popover>
  );
};

SchedulePopoper.propTypes = {
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func,
  data: PropTypes.object,
};

export default SchedulePopoper;
