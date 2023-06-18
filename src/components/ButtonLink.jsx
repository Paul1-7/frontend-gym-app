import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ButtonLink = (props) => {
  return <Button variant="outlined" color="secondary" LinkComponent={Link} {...props} />;
};

export default ButtonLink;
