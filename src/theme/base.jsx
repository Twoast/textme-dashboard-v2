import { GreenFieldsTheme } from './schemes/GreenFieldsTheme';
import { NebulaFighterTheme } from './schemes/NebulaFighterTheme';
import { PureLightTheme } from './schemes/PureLightTheme';

const themeMap = {
  PureLightTheme,
  GreenFieldsTheme,
  NebulaFighterTheme,
};

export const themeHelper = [
  {
    name: 'Pure Light',
    theme: 'PureLightTheme',
    image: '/static/images/themes/pure_light.png',
  },
  {
    name: 'Nebula Fighter',
    theme: 'NebulaFighterTheme',
    image: '/static/images/themes/nebula.png',
  },
  {
    name: 'Green Fields',
    theme: 'GreenFieldsTheme',
    image: '/static/images/themes/green_fields.png',
  },
];

export const themeCreator = (theme) => {
  return themeMap[theme];
};
