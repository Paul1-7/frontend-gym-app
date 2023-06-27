export const getHallListWithCapacityAndName = (data) => {
  return data.map((item) => ({
    id: item.id,
    nombre: `${item.nombre} (${item.capacidad} cap. max) `,
  }));
};
