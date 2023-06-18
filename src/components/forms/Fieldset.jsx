import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const style = {
  border: `1px solid ${grey['400']}`,
  padding: '24px',
  borderRadius: '10px',
  width: '100%',
  marginBottom: '1rem',
};

const Fieldset = ({ title, children, ...other }) => (
  <fieldset style={{ ...style, ...other }}>
    <Typography variant="subtitle1" align="center" component="legend" sx={{ padding: '0 16px', color: grey['600'] }}>
      {title}
    </Typography>
    {children}
  </fieldset>
);

export default Fieldset;

Fieldset.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  other: PropTypes.object,
};
