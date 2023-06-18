import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import PropTypes from 'prop-types';
const DataTableFilterCheck = ({ filterLabel, filterCheckValue, setFilterCheckValue }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox defaultChecked value={filterCheckValue} onChange={() => setFilterCheckValue(!filterCheckValue)} />
        }
        label={filterLabel ?? ''}
      />
    </FormGroup>
  );
};

DataTableFilterCheck.propTypes = {
  filterLabel: PropTypes.string,
  filterCheckValue: PropTypes.bool,
  setFilterCheckValue: PropTypes.func,
};

export default DataTableFilterCheck;
