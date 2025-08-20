import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    yellow: Palette['primary']
    green: Palette['primary']
    white: Palette['primary']
  }
  interface PaletteOptions {
    yellow?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    yellow: true
    green: true
    white: true
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#94182C',
      light: '#E61004',
      contrastText: '#EEEEEE',
    },
    green: {
      main: '#405647',
      light: '#177721',
      contrastText: '#EEEEEE',
    },
    yellow: {
      main: '#D18D24',
      contrastText: '#EEEEEE',
    },
    white: {
      main: '#EEEEEE',
      contrastText: '#000000',
    },
    background: {
      default: '#94182C',
      paper: '#EDE3D9',
    },
    action: {
      disabledBackground: '#707070',
      disabled: '#EEEEEE', // Adjusted for better contrast
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: 'SF Pro Display, sans-serif',
          textTransform: 'uppercase',
          borderRadius: 12,
          transition: 'all 0.2s ease',
          borderWidth: 2,
          borderStyle: 'solid',
          // Responsive defaults
          [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            padding: '12px 16px',
          },
          [theme.breakpoints.up('md')]: {
            fontSize: '2rem',
            padding: '12px 24px',
          },
        }),
      },
      variants: [
        // Primary medium
        {
          props: { color: 'primary', size: 'medium' },
          style: ({ theme }) => ({
            'backgroundColor': theme.palette.primary.main,
            'color': theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            'borderColor': theme.palette.primary.contrastText,
          }),
        },
        // Primary small
        {
          props: { color: 'primary', size: 'small' },
          style: ({ theme }) => ({
            'backgroundColor': theme.palette.primary.main,
            'color': theme.palette.primary.contrastText,
            'fontSize': '1.5rem',
            '&:hover': {
              backgroundColor: '#EEEEEE',
            },
            'borderColor': theme.palette.primary.contrastText,
          }),
        },
        // White medium
        {
          props: { color: 'white', size: 'medium' },
          style: ({ theme }) => ({
            'backgroundColor': theme.palette.white.main,
            'color': theme.palette.white.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.grey[300],
            },
            'borderColor': theme.palette.white.contrastText,
          }),
        },
        // White small
        {
          props: { color: 'white', size: 'small' },
          style: ({ theme }) => ({
            'backgroundColor': theme.palette.white.main,
            'color': theme.palette.white.contrastText,
            'fontSize': '1.5rem',
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
          }),
        },
        // Disabled (applies to all colors)
        {
          props: { disabled: true },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled,
          }),
        },
      ],
    },
  },
})

export default theme
