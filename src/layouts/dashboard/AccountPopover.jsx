import { useState } from 'react';
// @mui
import { Divider, Typography, Stack, MenuItem, Avatar, Chip, ListItemIcon } from '@mui/material';
// components
import MenuPopover from '@/components/MenuPopover';
import { useAuth } from '@/hooks';
import { stringAvatar } from '@/utils';
import { ExitToAppOutlined } from '@mui/icons-material';
import { Check } from '@mui/icons-material';

export default function AccountPopover() {
  const { authenticated, logout, handleSelectedRol } = useAuth();
  const { nombre, apellidoP, apellidoM, roles = [], selectedRol } = authenticated ?? {};

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Avatar alt="photoURL" {...stringAvatar(`${nombre} ${apellidoP} ${apellidoM}`)} onClick={handleOpen} />
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack sx={{ ml: 2, py: 2 }} alignItems={'center'} gap={1}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }} align="center">
            {`${nombre} ${apellidoP} ${apellidoM}`}
          </Typography>
          {roles
            .filter(({ nombre }) => nombre !== 'Socio')
            .map(({ nombre }) => {
              const isSelectedRol = selectedRol === nombre;
              return (
                <Chip
                  key={nombre}
                  variant={isSelectedRol ? 'filled' : 'outlined'}
                  label={nombre}
                  onClick={() => handleSelectedRol(nombre)}
                  icon={isSelectedRol ? <Check /> : null}
                />
              );
            })}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1, fontWeight: '700' }}>
          <ListItemIcon>
            <ExitToAppOutlined />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </MenuPopover>
    </>
  );
}
