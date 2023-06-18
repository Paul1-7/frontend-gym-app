import { TableCell } from '@mui/material';

import PropTypes from 'prop-types';

const DateCell = ({ value, align }) => <TableCell align={align}>{new Date(value).toLocaleDateString()}</TableCell>;

export default DateCell;

DateCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
};
