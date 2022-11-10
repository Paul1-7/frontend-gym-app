const COLUMNS = {
  socios: [
    { field: 'ci', header: 'Ci', type: '' },
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'apellidoM', header: 'Ap. Materno', type: '' },
    { field: 'apellidoP', header: 'Ap. Paterno', type: '' },
    { field: 'edad', header: 'Edad', type: '' },
    { field: 'celular', header: 'Celular', type: '' },
  ],
  empleados: [
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
    { field: 'fechaInicio', header: 'fecha de inicio', type: '' },
    { field: 'fechaFin', header: 'fecha fin', type: '' },
    { field: 'plan', header: 'plan', type: '' },
    { field: 'cantidad', header: 'cantidad', type: '' },
    { field: 'montoCancelado', header: 'monto cancelado', type: '' },
    { field: 'estado', header: 'estado', type: 'states' },
  ],
  sells: [
    { field: 'codVenta', header: 'código de venta', type: '' },
    { field: 'fecha', header: 'fecha', type: 'date' },
    { field: 'tipoVenta', header: 'tipo de venta', type: 'salesTypes' },
    { field: 'metodoPago', header: 'método de pago', type: 'paymentsMethods' },
    { field: 'cliente', header: 'cliente', type: '' },
    { field: 'vendedor', header: 'vendedor', type: '' },
  ],
  productsToSell: [
    { field: 'nombre', header: 'nombre', type: '' },
    { field: 'cantidad', header: 'cantidad', type: 'stock' },
    { field: 'precio', header: 'precio uni.', type: 'currency' },
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

export { COLUMNS, COLUMN_FORMAT, TABLE_STATES };
