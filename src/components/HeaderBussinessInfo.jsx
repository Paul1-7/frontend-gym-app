import { gymLogo } from '@/assets';
import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function HeaderBussinessInfo({ sx }) {
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack flexDirection="row" justifyContent="space-between">
        <img src={gymLogo} style={{ width: '10rem', height: '100%' }} alt="logo" />
        <Box>
          <Typography variant="h4" align="center">
            nombre
          </Typography>
          <Typography align="center" variant="caption" sx={{ display: 'flex', mb: 1 }}>
            direccion
            <br />
            Telefono:tel
            <br />
            Tarija
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#000' }} />
    </Box>
  );
}

HeaderBussinessInfo.propTypes = {
  data: PropTypes.object,
  sx: PropTypes.object,
};

export default HeaderBussinessInfo;
