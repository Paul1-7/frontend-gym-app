import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const ButtonShowAllRows = ({ showAllRows, onChange, disabled = 5 }) => {
  return (
    <FormGroup sx={{ paddingBottom: '2rem', displayPrint: 'none' }}>
      <FormControlLabel
        control={<Checkbox defaultChecked size="small" value={showAllRows} onChange={onChange} disabled={disabled} />}
        label="Mostrar solo las 10 primeras filas"
      />
    </FormGroup>
  );
};

ButtonShowAllRows.propTypes = {
  showAllRows: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonShowAllRows;
