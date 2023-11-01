import { memo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, Select, Box, Chip, MenuItem, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';
import { objectByString } from '@/utils/dataHandler';
import compare from 'just-compare';

const SelectChipMemo = memo(
  ({ name, label, methods, isArray, items, ...others }) => {
    const error = methods.formState.errors;

    const errorValue = isArray ? objectByString(error, name) : error[name];

    const handleChange = (event, field) => {
      const {
        target: { value },
      } = event;

      field.onChange(value);
    };

    const itemName = (value) => {
      const found = items.find((item) => {
        const valueObject = Object.values(item);
        return valueObject[0] === value;
      });
      return Object?.values(found)?.[1];
    };

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <FormControl sx={{ width: '100%' }} size="small">
            <InputLabel id={name} error={!!errorValue}>
              {label}
            </InputLabel>
            <Select
              multiple
              labelId={name}
              {...field}
              id={`multiple-chip-${name}`}
              input={<OutlinedInput id={`multiple-chip-${name}`} label={name} />}
              onChange={(event) => handleChange(event, field)}
              error={!!errorValue}
              value={field.value ?? []}
              {...others}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={itemName(value)} />
                  ))}
                </Box>
              )}
            >
              {items.map((item) => {
                const value = Object.values(item);
                return (
                  <MenuItem key={value?.[0]} value={value?.[0]}>
                    {value?.[1]}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText error={!!errorValue} color="error">
              {errorValue?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps?.disabled === nextProps?.disabled && !compare(prevProps.methods, nextProps.methods)
);
SelectChipMemo.displayName = 'SelectChipMemo';
export default SelectChipMemo;

SelectChipMemo.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.object,
  others: PropTypes.object,
  isArray: PropTypes.bool,
};
