import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import { gymLogo } from '@/assets';

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = <Box sx={{ height: 60, ...sx }} component="img" src={gymLogo} />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink to="/dashboard" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      {logo}
    </RouterLink>
  );
}
