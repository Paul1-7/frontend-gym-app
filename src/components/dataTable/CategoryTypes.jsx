import { TableCell } from '@mui/material';
import Label from '@/components/Label';

import PropTypes from 'prop-types';
import { TABLE_STATES } from '@/constants/dataTable';

const CategoryTypes = ({ value, align }) => {
  const label = TABLE_STATES.categoryTypes[value];
  return (
    <TableCell align={align}>
      <Label color={label.variant}>{label.name}</Label>
    </TableCell>
  );
};

export default CategoryTypes;

CategoryTypes.propTypes = {
  value: PropTypes.any,
  align: PropTypes.string,
};
