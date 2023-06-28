import { Backdrop as BackdropMui, CircularProgress } from '@mui/material';

import PropTypes from 'prop-types';

const Backdrop = ({ isLoading }) => {
  return (
    <BackdropMui sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={isLoading}>
      <CircularProgress color="inherit" />
    </BackdropMui>
  );
};

Backdrop.propTypes = {
  isLoading: PropTypes.bool,
};

export default Backdrop;
