import { TableCell, useTheme } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Stock = ({ value, align, minStock }) => {
  const theme = useTheme();
  const ERROR = theme.palette.error.dark;
  const SUCCESS = theme.palette.success.dark;

  return (
    <TableCell align={align} sx={{ color: minStock < value ? SUCCESS : ERROR }}>
      {value}
    </TableCell>
  );
};

export default Stock;

Stock.propTypes = {
  value: PropTypes.number.isRequired,
  minStock: PropTypes.number.isRequired,
  align: PropTypes.string,
};
