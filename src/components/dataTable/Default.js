import { TableCell } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Default = ({ value, align }) => <TableCell align={align}>{value}</TableCell>;

export default Default;

Default.propTypes = {
  value: PropTypes.any,
  align: PropTypes.string,
};
