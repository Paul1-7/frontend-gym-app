import { memo } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

import { objectByString } from '@/utils/dataHandler';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { ITEM_DEFAULT } from '@/constants';
import compare from 'just-compare';

const SelectMemo = memo(
  ({ name, label, isArray, methods, items = [], ...others }) => {
    const error = methods.formState.errors;
    const errorValue = isArray ? objectByString(error, name) : error[name];

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl fullWidth size="small">
            <InputLabel id={name}>{label}</InputLabel>
            <Select
              labelId={name}
              {...field}
              label={label}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              {...others}
            >
              <MenuItem value={ITEM_DEFAULT}>Ninguno</MenuItem>
              {items.map((item, index) => {
                const value = Object.values(item);
                return (
                  <MenuItem key={index} value={value?.[0]}>
                    {value?.[1]}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText error={!!errorValue} color="error">
              {errorValue?.message ?? ' '}
            </FormHelperText>
          </FormControl>
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps?.disabled === nextProps?.disabled && !compare(prevProps.methods, nextProps.methods)
);
SelectMemo.displayName = 'SelectMemo';
export default SelectMemo;

SelectMemo.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
