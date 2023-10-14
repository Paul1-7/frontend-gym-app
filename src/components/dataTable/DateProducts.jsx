import { TableCell, Typography } from '@mui/material';
import { differenceInDays } from 'date-fns';

import PropTypes from 'prop-types';

const DateCell = ({ value, align, isApplicable = true }) => {
  const dateNow = new Date();
  const dateGiven = new Date(value);
  const daysRemaining = differenceInDays(dateGiven, dateNow);

  let color = 'text.primary';

  if (daysRemaining <= 10) {
    color = 'warning.dark';
  }
  if (daysRemaining <= 0) {
    color = 'error.main';
  }

  return (
    <TableCell align={align}>
      {!isApplicable ? (
        <Typography component={'span'} color={color} variant="body2">
          {dateGiven.toLocaleDateString()}
        </Typography>
      ) : (
        'No aplicable'
      )}
    </TableCell>
  );
};

export default DateCell;

DateCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
  isApplicable: PropTypes.bool,
};
