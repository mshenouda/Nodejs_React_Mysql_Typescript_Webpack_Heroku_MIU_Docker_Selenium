import { createTheme, PaletteMode } from '@mui/material';

// Palette taken from the Haus Studio fee-schedule reference (light mode),
// with a matching dark variant.
export const ROYAL_BLUE = '#1A2D9E';
export const ROYAL_BLUE_DARK = '#13227A';
export const CRIMSON = '#DA2218';
export const CORAL = '#E08B86';
export const PANEL = '#FFFFFF';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: ROYAL_BLUE, dark: ROYAL_BLUE_DARK, contrastText: '#FFFFFF' },
          secondary: { main: CRIMSON, contrastText: '#FFFFFF' },
          background: { default: CORAL, paper: PANEL },
          text: { primary: ROYAL_BLUE },
        }
      : {
          primary: { main: '#5C6BC0', dark: '#26317A', contrastText: '#FFFFFF' },
          secondary: { main: '#EF5350', contrastText: '#FFFFFF' },
          background: { default: '#0E1220', paper: '#1A2030' },
          text: { primary: '#E3E7F5' },
        }),
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: mode === 'light' ? ROYAL_BLUE : '#161B2C',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          color: theme.palette.text.primary,
          fontWeight: 600,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          borderColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        }),
      },
    },
  },
});

export const getTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export default getTheme('light');