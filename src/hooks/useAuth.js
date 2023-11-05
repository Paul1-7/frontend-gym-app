import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('authenticated')));
  const navigate = useNavigate();

  const getIdSubmenus = (submenus) => {
    const idSubmenus = submenus.map(({ id }) => id);
    return Array.from(new Set(idSubmenus));
  };

  const getSubmenusFromRoles = (roles) => {
    return roles.map(({ submenus }) => submenus).flat(1);
  };

  const login = (data) => {
    const { nombre, apellidoP, apellidoM, roles, id } = data;

    const submenusFromRoles = getSubmenusFromRoles(roles);
    const idSubmenus = getIdSubmenus(submenusFromRoles);
    const newData = { nombre, apellidoM, apellidoP, roles, id, idSubmenus };
    setAuthenticated(newData);
    localStorage.setItem('authenticated', JSON.stringify(newData));
  };

  const logout = () => {
    localStorage.removeItem('authenticated');
    setAuthenticated(null);
    navigate('/');
  };

  const isAllowedRol = (submenu = []) => {
    const { idSubmenus } = authenticated ?? {};

    return idSubmenus.some((idSubmenu) => {
      return submenu.includes(idSubmenu);
    });
  };

  const getAllowedButtonsDatatable = (buttonsId) => {
    const buttonsAllowed = {
      edit: false,
      remove: false,
      detail: false,
    };
    const { idSubmenus } = authenticated ?? {};

    Object.entries(buttonsId).forEach(([key, value]) => {
      if (idSubmenus.includes(value)) {
        buttonsAllowed[key] = true;
      }
    });

    return buttonsAllowed;
  };

  return { authenticated, login, logout, isAllowedRol, getAllowedButtonsDatatable };
};

export default useAuth;
