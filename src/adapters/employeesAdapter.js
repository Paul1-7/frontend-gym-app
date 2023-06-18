export const employeeListWithNameRols = (data) => {
  return data.map((item) => ({
    ...item,
    roles: item.roles.map(({ nombre }) => nombre),
  }));
};

export const employeeWithIDRols = (data) => {
  return {
    ...data,
    usuario: data.usuario ? data.usuario : '',
    password: data.password ? data.password : '',
    roles: data.roles.map(({ id }) => id),
  };
};
