import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const BaseLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
