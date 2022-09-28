import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Avatar, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import { themeHelper } from 'src/theme/base';
import { ThemeContext } from 'src/theme/ThemeProvider';

const ThemeChanger = (props) => {
  const { onClose, selectedValue, open } = props;
  const setTheme = useContext(ThemeContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    setTheme(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Theme</DialogTitle>
      <List sx={{ pt: 0 }}>
        {themeHelper.map((theme) => (
          <ListItem
            button
            onClick={() => handleListItemClick(theme.theme)}
            key={theme.theme}
            selected={selectedValue == theme.theme}
          >
            <ListItemAvatar>
              <Avatar src={theme.image} alt={theme.name} />
            </ListItemAvatar>
            <ListItemText primary={theme.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

ThemeChanger.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const HeaderSearch = () => {
  const selected_theme = window.localStorage.getItem('appTheme') || 'PureLightTheme';
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected_theme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Tooltip arrow title="Theme">
        <IconButton color="primary" onClick={handleClickOpen}>
          <Brightness4Icon />
        </IconButton>
      </Tooltip>
      <ThemeChanger selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};

export default HeaderSearch;
