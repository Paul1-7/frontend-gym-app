import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('authenticated')));
  const navigate = useNavigate();

  const login = (data) => {
    const { nombre, apellidoP, apellidoM, roles, id } = data;

    const newData = { nombre, apellidoM, apellidoP, roles, id };
    setAuthenticated(newData);
    localStorage.setItem('authenticated', JSON.stringify(newData));
  };

  const logout = () => {
    localStorage.removeItem('authenticated');
    setAuthenticated(null);
    navigate('/');
  };

  const isAllowedRol = (rols = []) => {
    const { roles = [] } = authenticated ?? {};

    return roles.some(({ id }) => {
      return rols.includes(id);
    });
  };

  return { authenticated, login, logout, isAllowedRol };
};

export default useAuth;
