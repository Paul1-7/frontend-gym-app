import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | ALSYSGYM`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

Page.displayName = 'Page';

export default Page;
