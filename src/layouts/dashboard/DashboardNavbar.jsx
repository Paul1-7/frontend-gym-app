import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import AccountPopover from './AccountPopover';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
  borderBottom: '1px solid rgba(0,0,0,0.1)',
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Stack justifyContent={'space-between'} flexDirection={'row'} sx={{ width: '100%' }} alignItems={'center'}>
          <div></div>
          <Typography color={'text.primary'} variant="h6" sx={{ textShadow: 'rgba(0,0,0,0.3) 4px 3px 4px' }}>
            GIMNACIO ACTIVE LIFE DE TARIJA
          </Typography>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
