import { TableCell } from '@mui/material';

import PropTypes from 'prop-types';

const DateCell = ({ value, align, isApplicable = true }) => (
  <TableCell align={align}>{isApplicable ? new Date(value).toLocaleDateString() : 'No aplicable'}</TableCell>
);

export default DateCell;

DateCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
  isApplicable: PropTypes.bool,
};
