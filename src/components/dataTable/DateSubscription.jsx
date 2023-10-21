import { daysElapsedFromNow } from '@/utils';
import { TableCell, Typography } from '@mui/material';
import { differenceInDays } from 'date-fns';

import PropTypes from 'prop-types';

const DateSubscriptionCell = ({ value, align, isApplicable = true, initialDate }) => {
  const dateNow = new Date();
  const dateGiven = new Date(value);
  const daysRemaining = differenceInDays(dateGiven, dateNow);

  let color = 'success.dark';

  if (daysRemaining <= 10) {
    color = 'warning.dark';
  }
  if (daysRemaining <= 0 || daysElapsedFromNow(initialDate) > 0) {
    color = 'error.dark';
  }

  return (
    <TableCell align={align}>
      {isApplicable ? (
        <Typography component={'span'} color={color} variant="body2">
          {dateGiven.toLocaleDateString()}
        </Typography>
      ) : (
        'No aplicable'
      )}
    </TableCell>
  );
};

export default DateSubscriptionCell;

DateSubscriptionCell.propTypes = {
  value: PropTypes.string,
  align: PropTypes.string,
  initialDate: PropTypes.string,
  isApplicable: PropTypes.bool,
};
