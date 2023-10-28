import { useMemo, useState, useCallback } from 'react';
import { REPORT_FREQUENCY_OPTIONS } from '@/constants';
import { useRef } from 'react';

export const useReport = ({ formMethods, initialFormOptions, filename = '', criteriaOptions }) => {
  const [showAllRows, setShowAllRows] = useState(true);
  const selectedOptions = formMethods.watch();
  const CUSTOM_RANGE_DATE = '5';

  const selectedCriterio = useRef(null);
  const selectedFrequency = useRef(null);

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
    selectedFrequency.current = REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === idDateRange);

    if (selectedFrequency.current.id === CUSTOM_RANGE_DATE) {
      return {
        dateStart: customDateRange.dateStart.toISOString(),
        dateEnd: customDateRange.dateEnd.toISOString(),
      };
    } else {
      return { dateStart: selectedFrequency.current.dateStart, dateEnd: selectedFrequency.current.dateEnd };
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

    if (options.criterio) {
      params.criterio = options.criterio;
      selectedCriterio.current = criteriaOptions.find(({ id }) => id === options.criterio);
    }

    params.orderBy = getOrderByFromOptions();

    return params;
  }, [selectedOptions]);

  const toggleShowRows = useCallback(() => {
    setShowAllRows((prevShowAllRows) => !prevShowAllRows);
  }, []);

  const completedFileName = `${filename}-${selectedCriterio.current?.name ?? ''}-${
    selectedFrequency.current?.name ?? ''
  }`;

  return {
    fileName: completedFileName,
    showAllRows,
    toggleShowRows,
    searchTerm: memoizedSearchTerm,
  };
};
