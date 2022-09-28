import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';

const SidebarRouterMenu = {
  menus: [
    {
      name: 'support',
      routes: [
        {
          url: '/support/numbers/parked',
          name: 'Parked Numbers',
          icon: <SettingsPhoneIcon />,
        },
      ],
    },
  ],
};

export default SidebarRouterMenu;
