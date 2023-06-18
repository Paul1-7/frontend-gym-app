import { Grid } from '@mui/material';
import './index.css';

function ScreenLoader() {
  return (
    <Grid sx={{ height: '100vh' }} container justifyContent="center" alignItems="center">
      <span className="loader"></span>
    </Grid>
  );
}

export default ScreenLoader;
