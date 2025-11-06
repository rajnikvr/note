import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    card: '#f7f7f7',
    primary: '#000000',
    border: '#e0e0e0',
  },
};

export const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    text: '#ffffff',
    card: '#111111',
    primary: '#ffffff',
    border: '#222222',
  },
};
