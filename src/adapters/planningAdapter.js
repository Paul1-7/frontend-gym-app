export const getPlanningListAdapter = (data) => {
  return data.map((item) => ({
    ...item,
    entrenador: `${item.entrenador.nombre} ${item.entrenador.apellidoP}`,
    disciplina: item.disciplina.nombre,
  }));
};

export const getPlanningAdapter = (data) => {
  return {
    ...data,
    fecha: new Date(data.fecha),
    idEntrenador: { id: data.entrenador.id, nombre: `${data.entrenador.nombre} ${data.entrenador.apellidoP}` },
    idSocio: data.detalle.map(({ socio }) => ({
      id: socio.id,
      nombre: `${socio.nombre} ${socio.apellidoP} - ${socio.ci}`,
    })),
  };
};
