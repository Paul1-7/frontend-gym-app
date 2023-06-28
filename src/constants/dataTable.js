const COLUMNS_TABLE = {
  partners: [
    { field: 'ci', header: 'Ci', type: '' },
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'apellidoM', header: 'Ap. Materno', type: '' },
    { field: 'apellidoP', header: 'Ap. Paterno', type: '' },
    { field: 'edad', header: 'Edad', type: '' },
    { field: 'celular', header: 'Celular', type: '' },
  ],
  employees: [
    { field: 'ci', header: 'Ci', type: '' },
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'apellidoM', header: 'Ap. Materno', type: '' },
    { field: 'apellidoP', header: 'Ap. Paterno', type: '' },
    { field: 'edad', header: 'Edad', type: '' },
    { field: 'celular', header: 'Celular', type: '' },
    { field: 'roles', header: 'Roles', type: 'array' },
  ],
  salones: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'capacidad', header: 'capacidad', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  productos: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'precioVenta', header: 'precio', type: 'currency' },
    { field: 'fechaVencimiento', header: 'fecha de vencimiento', type: 'date' },
    { field: 'stock', header: 'stock', type: 'stock' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  disciplinas: [
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'descripcion', header: 'Descripción', type: '' },
    { field: 'estado', header: 'Estado', type: 'states' },
  ],
  horarios: [
    { field: 'disciplina', header: 'disciplina', type: '' },
    { field: 'salon', header: 'salon', type: '' },
    { field: 'entrenador', header: 'entrenador', type: '' },
    { field: 'horarioEntrada', header: 'horario de entrada', type: '' },
    { field: 'horarioSalida', header: 'horario de salida', type: '' },
    { field: 'dia', header: 'dia', type: '' },
    { field: 'capacidad', header: 'capacidad', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  planes: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'precio', header: 'precio', type: '' },
    { field: 'duracion', header: 'duración', type: '' },
    { field: 'esExpandible', header: 'es expandible', type: 'extendable' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  suscripciones: [
    { field: 'socio', header: 'socio', type: '' },
    { field: 'ci', header: 'ci', type: '' },
    { field: 'fechaInicio', header: 'fecha de inicio', type: 'date' },
    { field: 'fechaFin', header: 'fecha fin', type: 'date' },
    { field: 'plan', header: 'plan', type: '' },
    { field: 'diasExtras', header: 'dias extras', type: '' },
    { field: 'cantidad', header: 'cantidad', type: '' },
    { field: 'montoCancelado', header: 'monto cancelado', type: 'currency' },
  ],
  ventas: [
    { field: 'codVenta', header: 'código de venta', type: '' },
    { field: 'fecha', header: 'fecha', type: 'date' },
    { field: 'socio', header: 'socio', type: '' },
    { field: 'ci', header: 'ci del socio', type: '' },
    { field: 'vendedor', header: 'vendedor', type: '' },
  ],
  productosParaVenta: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'stock', header: 'cantidad', type: 'stock' },
    { field: 'precioVenta', header: 'precio uni.', type: 'currency' },
  ],
};

const TABLE_STATES = {
  active: [
    { name: 'Deshabilitado', variant: 'error' },
    { name: 'Habilitado', variant: 'success' },
  ],
  extendable: [
    { name: 'No', variant: 'error' },
    { name: 'Si', variant: 'success' },
  ],
  salesTypes: [
    { name: 'Directa', variant: 'info' },
    { name: 'Electrónica', variant: 'info' },
  ],
  paymentMethods: [
    { name: 'En efectivo', variant: 'info' },
    { name: 'Paypal', variant: 'info' },
    { name: 'Stripe', variant: 'info' },
  ],
};

const COLUMN_FORMAT = {
  id: '',
  numeric: false,
  disablePadding: false,
  sorting: true,
  label: '',
};

export { COLUMNS_TABLE, COLUMN_FORMAT, TABLE_STATES };
