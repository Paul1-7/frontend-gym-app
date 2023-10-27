import { useMemo, useState, useCallback } from 'react';
import { parseISO } from 'date-fns';
import { REPORT_FREQUENCY_OPTIONS } from '@/constants';

export const useReport = ({ formMethods, initialFormOptions }) => {
  const [showAllRows, setShowAllRows] = useState(true);
  const selectedOptions = formMethods.watch();
  const CUSTOM_RANGE_DATE = '5';

  const hasOptionsByDefault = () => {
    const selectedValues = Object.values(selectedOptions.options);
    const initialFormValues = Object.values(initialFormOptions);
    return selectedValues.some((selectedValue) => initialFormValues.includes(selectedValue));
  };

  const getOrderByFromOptions = () => {
    const { orderBy } = selectedOptions.options;
    return orderBy;
  };

  const getRangeFromFrequencyOptions = () => {
    const { options, customDateRange } = selectedOptions;
    const { idDateRange } = options;
    const selectedFrequency = REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === idDateRange);

    if (selectedFrequency.id === CUSTOM_RANGE_DATE) {
      return {
        dateStart: parseISO(customDateRange.dateStart),
        dateEnd: parseISO(customDateRange.dateEnd),
      };
    } else {
      return { dateStart: selectedFrequency.dateStart, dateEnd: selectedFrequency.dateEnd };
    }
  };

  const memoizedSearchTerm = useMemo(() => {
    if (hasOptionsByDefault()) {
      return null;
    }

    const { options, customDateRange } = selectedOptions;
    let params = {};

    if (options.idDateRange && customDateRange) {
      params = getRangeFromFrequencyOptions();
    }

    params.orderBy = getOrderByFromOptions();

    return params;
  }, [selectedOptions]);

  const toggleShowRows = useCallback(() => {
    setShowAllRows((prevShowAllRows) => !prevShowAllRows);
  }, []);

  const fileName = `reporte-${selectedOptions?.criterio}`;

  return {
    fileName,
    showAllRows,
    toggleShowRows,
    searchTerm: memoizedSearchTerm,
  };
};
