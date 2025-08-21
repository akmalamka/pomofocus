import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    yellow: Palette['primary']
    green: Palette['primary']
    creme: Palette['primary']
    white: Palette['primary']
  }
  interface PaletteOptions {
    yellow?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
    creme?: PaletteOptions['primary']
    white?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    yellow: true
    green: true
    creme: true
    white: true
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    yellow: true
    green: true
    creme: true
    white: true
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    white: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    white: true
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'SF Pro Display, sans-serif', // default font
    h1: {
      fontFamily: 'Heinz Label, serif',
      fontSize: '5rem',
      lineHeight: 1,
    },
    h2: {
      fontFamily: 'Heinz Label, serif',
      fontSize: '3.75rem',
      lineHeight: 1,
    },
    h3: {
      fontFamily: 'Heinz Label, serif',
      fontSize: '2rem',
      lineHeight: 1,
    },
    h4: {
      fontFamily: 'SF Pro Display, sans-serif',
      fontSize: '10rem',
      lineHeight: 1,
    },
    body1: {
      fontSize: '1.5rem',
      letterSpacing: '0.02em',
    },
    body2: {
      fontSize: '1rem',
      letterSpacing: '0.02em',
    },
  },
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
    creme: {
      main: '#EDE3D9',
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
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: 'Heinz Label, sans-serif',
          lineHeight: 1,
          textTransform: 'uppercase',
          borderRadius: 12,
          transition: 'all 0.2s ease',
          borderWidth: 2,
          borderStyle: 'solid',
          boxShadow: theme.shadows[3],
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
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.contrastText,
          }),
        },
        // Primary small
        {
          props: { color: 'primary', size: 'small' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: '1.5rem',
            borderColor: theme.palette.primary.contrastText,
          }),
        },
        // White medium
        {
          props: { color: 'white', size: 'medium' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.white.main,
            color: theme.palette.white.contrastText,
            borderColor: theme.palette.white.contrastText,
          }),
        },
        // White small
        {
          props: { color: 'white', size: 'small' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.white.main,
            color: theme.palette.white.contrastText,
            fontSize: '1.5rem',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          backgroundColor: theme.palette.white.main,
          [theme.breakpoints.down('md')]: {
            'fontSize': '0.8rem',
            '& .MuiInputBase-input': {
              padding: '8px 10px',
              fontSize: '1rem',
            },
          },
          [theme.breakpoints.up('md')]: {
            'fontSize': '1rem',
            '& .MuiInputBase-input': {
              padding: '20px 32px',
              fontSize: '1.5rem',
            },
          },
        }),
        notchedOutline: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          'width': '100%',
          '& .MuiInputBase-input': {
            fontFamily: 'SF Pro Display, sans-serif',
            fontSize: '1rem',
            textAlign: 'center',
            borderRadius: 12,
          },
        },
      },
    },
    MuiIconButton: {
      variants: [
        {
          props: { color: 'primary' },
          style: ({ theme }) => ({
            'backgroundColor': theme.palette.primary.main,
            'color': theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        },
        {
          props: { color: 'white' },
          style: ({ theme }) => ({
            'backgroundColor': theme.palette.white.main,
            'color': theme.palette.white.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.grey[300],
            },
          }),
        },
      ],
      styleOverrides: {
        root: {
          transition: 'all 280ms ease-in-out',
        },
      },
    },
  },
})

export default theme
