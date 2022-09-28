import { Box } from '@mui/material';
import HeaderNotifications from './Notifications';
import HeaderSearch from './Search';
import HeaderStyleChanger from './StyleChanger';

const HeaderButtons = () => {
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
      <HeaderStyleChanger />
    </Box>
  );
};

export default HeaderButtons;
