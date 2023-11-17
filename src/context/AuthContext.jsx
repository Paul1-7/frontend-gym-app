import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('authenticated')));
  const navigate = useNavigate();

  const getIdSubmenus = (submenus) => {
    const idSubmenus = submenus.map(({ id }) => id);
    return Array.from(new Set(idSubmenus));
  };

  const getSubmenusFromRoles = (roles, selectedRol) => {
    return roles
      .filter(({ nombre }) => nombre === selectedRol)
      .map(({ submenus }) => submenus)
      .flat(1);
  };

  const login = (data) => {
    const { nombre, apellidoP, apellidoM, roles, id } = data;
    const selectedRol = roles[0].nombre;
    const submenusFromRoles = getSubmenusFromRoles(roles, selectedRol);
    const idSubmenus = getIdSubmenus(submenusFromRoles);
    const newData = { nombre, apellidoM, apellidoP, roles, id, idSubmenus, selectedRol };
    setAuthenticated(newData);
    localStorage.setItem('authenticated', JSON.stringify(newData));
  };

  const handleSelectedRol = (nombre) => {
    const { roles } = authenticated;
    const submenusFromRoles = getSubmenusFromRoles(roles, nombre);
    const idSubmenus = getIdSubmenus(submenusFromRoles);

    setAuthenticated((prev) => ({ ...prev, selectedRol: nombre, idSubmenus }));
  };

  useEffect(() => {
    localStorage.setItem('authenticated', JSON.stringify(authenticated));
  }, [authenticated]);

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

  const data = { authenticated, login, logout, isAllowedRol, getAllowedButtonsDatatable, handleSelectedRol };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
