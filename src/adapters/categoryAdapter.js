export const getCategoriesItemsList = (data) => {
  return data.map(({ id, nombre }) => ({
    id,
    nombre,
  }));
};

export const getCategoryToModify = (data) => {
  const typeList = {
    0: {
      parentField: 'disciplinas',
      childrenField: 'disciplina',
    },
    1: {
      parentField: 'maquinarias',
      childrenField: 'maquinaria',
    },
    2: {
      parentField: 'productos',
      childrenField: 'producto',
    },
  };

  const { parentField, childrenField } = typeList[data.tipo];

  return {
    ...data,
    tipoLista: data[parentField].map((item) => {
      const value = item[childrenField];
      return { id: value.id, nombre: value.nombre };
    }),
  };
};
