export const getDisciplinesAdapter = (items) => {
  return items.map((item) => ({
    ...item,
    categoria: item.categoria.nombre,
  }));
};
