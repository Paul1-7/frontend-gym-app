import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const SearchBar = ({ setSearchQuery }) => (
  <form style={{ width: 'max-content' }}>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(String(e.target.value).toLowerCase());
      }}
      autoComplete="off"
      variant="outlined"
      placeholder="Buscar..."
      size="small"
      sx={{ width: '15rem' }}
    />
  </form>
);
SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
