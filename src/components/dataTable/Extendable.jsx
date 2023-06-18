import { TableCell } from '@mui/material';
import Label from '@/components/Label';

import PropTypes from 'prop-types';
import { TABLE_STATES } from '@/constants/dataTable';

const Extendable = ({ value, align }) => {
  const states = TABLE_STATES.extendable;
  return (
    <TableCell align={align}>
      <Label color={states[value].variant}>{states[value].name}</Label>
    </TableCell>
  );
};

export default Extendable;

Extendable.propTypes = {
  value: PropTypes.any,
  align: PropTypes.string,
};
