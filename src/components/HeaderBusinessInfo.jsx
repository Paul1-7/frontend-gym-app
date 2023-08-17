import PropTypes from 'prop-types';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { gymLogo } from '@/assets';
import { BUSINESS_INFO } from '@/constants';

const HeaderBusinessInfo = ({ sx }) => {
  const { name, phone, city, address } = BUSINESS_INFO;
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack flexDirection="row" justifyContent="space-between">
        <img src={gymLogo} style={{ width: '6rem', height: '100%' }} alt="logo" />
        <Box>
          <Typography variant="h4" align="center">
            {name}
          </Typography>
          <Typography align="center" variant="caption" sx={{ display: 'flex', mb: 1 }}>
            {address}
            <br />
            Telefono:{phone}
            <br />
            Ciudad:
            {city}
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#000' }} />
    </Box>
  );
};

HeaderBusinessInfo.propTypes = {
  sx: PropTypes.object,
};

export default HeaderBusinessInfo;
