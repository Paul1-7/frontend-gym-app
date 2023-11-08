import { memo } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { objectByString } from '@/utils/dataHandler';
import compare from 'just-compare';

const CheckboxMemo = memo(
  ({ name, label, isArray, helperText = '', methods, HelperTextProps, items, BoxProps, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];

    const toggleCheckboxValue = (value) => {
      let updatedArray = [...methods.getValues(name)];

      if (updatedArray.includes(value)) {
        updatedArray = updatedArray.filter((item) => item !== value);
      } else {
        updatedArray.push(value);
      }

      methods.setValue(name, updatedArray);
    };

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl>
            <FormGroup>
              <FormLabel id={name}>{label}</FormLabel>
              <Box {...BoxProps}>
                {items.map(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox
                        checked={field.value.includes(value)}
                        onClick={() => {
                          toggleCheckboxValue(value);
                        }}
                        {...others}
                      />
                    }
                    label={label}
                  />
                ))}
              </Box>
              <FormHelperText error={!!errorValue} color="error" {...HelperTextProps}>
                {errorValue?.message && helperText}
              </FormHelperText>
            </FormGroup>
          </FormControl>
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps?.disabled === nextProps?.disabled && !compare(prevProps.methods, nextProps.methods)
);
CheckboxMemo.displayName = 'InputMemo';
export default CheckboxMemo;

CheckboxMemo.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  items: PropTypes.array,
  label: PropTypes.string,
  others: PropTypes.node,
  methods: PropTypes.object,
  HelperTextProps: PropTypes.object,
  BoxProps: PropTypes.object,
  isArray: PropTypes.bool,
};
