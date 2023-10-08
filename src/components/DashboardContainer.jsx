import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ButtonLink from './ButtonLink';
import Page from './Page';

function DashboardContainer({ data, children }) {
  const { title, description, button } = data;
  const { icon: Icon, url, name } = button ?? {};
  return (
    <Page title={title} sx={{ px: 4 }}>
      <Typography variant="h3" gutterBottom component={'h1'}>
        {title}
      </Typography>
      <Typography component="p" sx={{ mb: 4 }}>
        {description}
      </Typography>
      {button && (
        <Grid item container direction="row-reverse">
          <ButtonLink to={url} endIcon={<Icon />}>
            {name}
          </ButtonLink>
        </Grid>
      )}
      {children}
    </Page>
  );
}

DashboardContainer.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node,
};

export default DashboardContainer;
