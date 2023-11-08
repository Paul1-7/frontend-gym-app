import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CheckboxMemo } from '../memo';

function Checkbox({ name, isArray, label, items, helperText, HelperTextProps, BoxProps, ...others }) {
  const methods = useFormContext();
  return (
    <CheckboxMemo
      name={name}
      label={label}
      isArray={isArray}
      methods={methods}
      {...others}
      items={items}
      helperText={helperText}
      HelperTextProps={HelperTextProps}
      BoxProps={BoxProps}
    />
  );
}

export default Checkbox;

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  others: PropTypes.object,
  isArray: PropTypes.bool,
  helperText: PropTypes.string,
  HelperTextProps: PropTypes.object,
  BoxProps: PropTypes.object,
};
