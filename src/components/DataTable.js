import { useState } from 'react';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  return data.filter((item) => Object.values(item).toString().toLowerCase().includes(query));
};

const DataTable = ({ rowsData, columnsData, error, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dataFiltered = filterData(searchQuery, rowsData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Grid>
      <Grid item xs={12} height={420}>
        <DataGrid
          rows={dataFiltered}
          columns={columnsData}
          pageSize={5}
          rowsPerPageOptions={[5]}
          error={error}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default DataTable;

DataTable.prototype = {
  rowsData: PropTypes.array,
  columnsData: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  loading: PropTypes.bool,
};
