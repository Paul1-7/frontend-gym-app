import DataTableContext from '@/context/DataTableContext';
import { useContext } from 'react';

const useTable = () => {
  const table = useContext(DataTableContext);
  return { table };
};

export default useTable;
