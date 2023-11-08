export const getRolsListChipAdapter = (items) => {
  return items.map(({ id, nombre }) => ({ idRol: id, nombre }));
};
