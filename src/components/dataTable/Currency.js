import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';
import { getBOBCurrency } from 'utils/dataHandler';

const Currency = ({ value, align }) => <TableCell align={align}>{getBOBCurrency(value)}</TableCell>;

export default Currency;

Currency.propTypes = {
  value: PropTypes.number,
  align: PropTypes.string,
};
