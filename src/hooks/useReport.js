import { useMemo, useState, useCallback } from 'react';
import { REPORT_FREQUENCY_OPTIONS } from '@/constants';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useReport = ({
  formMethods,
  initialFormOptions,
  filename = '',
  criteriaOptions,
  frequencyOptions,
  fnOPtions,
  sendCriterio = true,
}) => {
  const [showAllRows, setShowAllRows] = useState(true);
  const selectedOptions = formMethods.watch();
  const CUSTOM_RANGE_DATE = '5';
  const ALL_DATES = '6';

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
    const frequency = frequencyOptions ?? REPORT_FREQUENCY_OPTIONS;
    selectedFrequency.current = frequency?.find(({ id }) => id === idDateRange);
    console.log('TCL: getRangeFromFrequencyOptions -> selectedFrequency.current', selectedFrequency.current);

    if (selectedFrequency.current.id === ALL_DATES) return {};

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

    console.log(options.idDateRange);
    if (options.idDateRange && customDateRange) {
      params = getRangeFromFrequencyOptions();
    }

    if (options.criterio) {
      params.criterio = options.criterio;
    }

    if (options.orderBy) {
      params.orderBy = getOrderByFromOptions();
    }

    if (fnOPtions) {
      params = { ...params, ...fnOPtions(options) };
    }

    selectedCriterio.current = criteriaOptions?.find(({ id }) => id === params?.criterio);

    if (!sendCriterio) delete params.criterio;

    return params;
  }, [selectedOptions]);

  const toggleShowRows = useCallback(() => {
    setShowAllRows((prevShowAllRows) => !prevShowAllRows);
  }, []);

  const completedFileName = `${filename}-${selectedCriterio.current?.name ?? ''}-${
    selectedFrequency.current?.name ?? ''
  }`;

  const responseReport = useQuery({
    queryKey: ['report'],
    queryFn: () => selectedCriterio.current?.service({ params: memoizedSearchTerm }),
    enabled: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (!memoizedSearchTerm) return;
    responseReport.refetch();
  }, [memoizedSearchTerm]);

  return {
    filename: completedFileName,
    showAllRows,
    toggleShowRows,
    searchTerm: memoizedSearchTerm,
    columns: selectedCriterio.current?.columns,
    service: selectedCriterio.current?.service,
    responseReport,
  };
};
