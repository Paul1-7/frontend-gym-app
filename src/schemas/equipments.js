import * as yup from 'yup';

const equipments = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').max(50, 'El nombre no puede exceder los 50 caracteres'),
  marca: yup.string().required('La marca es obligatoria').max(50, 'La marca no puede exceder los 50 caracteres'),
  modelo: yup.string().required('El modelo es obligatorio').max(50, 'El modelo no puede exceder los 50 caracteres'),
  fechaAdquisicion: yup
    .date()
    .required('La fecha de adquisición es obligatoria')
    .max(new Date(), 'La fecha de adquisición no puede ser en el futuro'),
  capacidad: yup
    .number()
    .typeError('La capacidad debe ser un número')
    .required('La capacidad es obligatoria')
    .positive('La capacidad debe ser un número positivo'),
  precio: yup
    .number()
    .typeError('El precio debe ser un número')
    .required('El precio es obligatorio')
    .positive('El precio debe ser un número positivo'),
  estado: yup
    .string()
    .required('El estado es obligatorio')
    .oneOf(['operativa', 'reparacion', 'fueraServicio'], 'Estado no válido'),
});

export default equipments;
