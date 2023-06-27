export const schedulesListToDetail = (data) =>
  data.map((item) => {
    const { entrenador, disciplina, salon } = item;
    return {
      ...item,
      entrenador: entrenador.nombre + ' ' + entrenador.apellidoP,
      disciplina: disciplina.nombre,
      salon: salon.nombre,
    };
  });
