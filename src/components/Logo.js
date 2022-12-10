import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = <Box sx={{ height: 60, ...sx }} component="img" src="/static/gym-logo.png" />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink to="/dashboard" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      {logo}
    </RouterLink>
  );
}
