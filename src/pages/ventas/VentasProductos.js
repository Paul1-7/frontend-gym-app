import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { getBOBCurrency } from 'utils/dataHandler';

import Input from 'components/forms/container/Input';
import { Clear } from '@mui/icons-material';
import DataTableContext from 'context/DataTableContext';
import { toast, ToastContainer } from 'react-toastify';

// const initialForm = {
//   id:'',
//   cantidad: '1',
//   nombre:'',
//   precio: ''
// };

const VentaProductos = ({ data = null }) => {
  const { control } = useFormContext();
  const { dataRow, enableButton } = useContext(DataTableContext);
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'productos',
  });
  const watch = useWatch({ name: 'productos' });

  useEffect(() => {
    if (dataRow) {
      append({
        nombre: dataRow.nombre,
        id: dataRow.id,
        precio: dataRow.precioVenta,
        stock: dataRow.stock,
        cantidad: '1',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataRow]);

  useEffect(() => {
    if (watch.length <= 0) return;

    watch.forEach((item, index) => {
      if (item.cantidad > item.stock) {
        const msg = `la cantidad del producto ${item.nombre} excede el stock disponible`;
        toast.error(msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        update(index, { ...item, cantidad: 1 });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      <Box>
        <Typography variant="subtitle1" gutterBottom align="center">
          Detalle
        </Typography>
      </Box>
      <Box sx={{ marginTop: '16px' }}>
        {fields.map((item, index) => (
          <Grid container wrap="wrap" spacing={1} key={item.id}>
            <Grid item xs={12} md={6}>
              <Input label="Producto" disabled name={`productos.${index}.nombre`} isArray />
            </Grid>
            <Grid item xs={12} md={2}>
              <Input label="Cantidad" name={`productos.${index}.cantidad`} isArray type="number" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                value={getBOBCurrency(watch?.[index]?.cantidad * watch?.[index]?.precio)}
                label="Subtotal"
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                aria-label="eliminar"
                onClick={() => {
                  const id = watch?.[index].id;
                  remove(index);
                  enableButton(id);
                }}
              >
                <Clear color="error" />
              </Button>
            </Grid>
          </Grid>
        ))}
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginRight: '1rem' }}>
          <Typography variant="subtitle1">
            Total: {getBOBCurrency(watch.reduce((prev, current) => prev + current.precio * current.cantidad, 0))}
          </Typography>
        </Box>
      </Box>
      <ToastContainer draggablePercent={60} />
    </>
  );
};
export default VentaProductos;

VentaProductos.propTypes = {
  data: PropTypes.object,
};
