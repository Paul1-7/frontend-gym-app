export const getRolsListChipAdapter = (items) => {
  return items.map(({ id, nombre }) => ({ idRol: id, nombre }));
};

export const getRolToModify = (data) => {
  return {
    nombre: data.nombre,
    idMenus: data.submenus.map(({ id }) => id),
  };
};
