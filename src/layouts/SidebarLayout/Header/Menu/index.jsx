import { Menu, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';
import Link from 'src/components/Link';

function HeaderMenu() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={Link} href="/">
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={Link} href="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={Link} href="/components/cards">
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={Link} href="/components/modals">
          Modals
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
