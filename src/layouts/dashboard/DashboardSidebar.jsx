import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography, Avatar, Chip, Stack } from '@mui/material';
// mock
// hooks

import navConfig from './NavConfig';
import { Logo, NavSection, Scrollbar } from '@/components';
import { useAuth, useResponsive } from '@/hooks';
import { stringAvatar } from '@/utils';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { authenticated } = useAuth();
  const { nombre, apellidoP, apellidoM, roles = [] } = authenticated ?? {};

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        maxHeight: '100vh',
        overflowY: 'scroll',
        '& .simplebar-placeholder': {
          height: '0 !important',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountStyle>
          <Avatar alt="photoURL" {...stringAvatar(`${nombre} ${apellidoP} ${apellidoM}`)} />
          <Stack sx={{ ml: 2 }} alignItems={'center'} gap={1}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }} align="center">
              {`${nombre} ${apellidoP} ${apellidoM}`}
            </Typography>
            {roles
              .filter(({ nombre }) => nombre !== 'Socio')
              .map(({ nombre }) => (
                <Chip key={nombre} variant="outlined" label={nombre} />
              ))}
          </Stack>
        </AccountStyle>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
