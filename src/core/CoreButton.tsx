import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

export const CoreButton = styled(Button)(() => ({
  // contained variant
  '&.MuiButton-contained': {
    'backgroundColor': '#EEEEEE',
    'color': 'black',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)', // subtle hover
    },
    '&:active': {
      backgroundColor: '#D6D6D6', // pressed state
    },
  },

  // outlined variant
  '&.MuiButton-outlined': {
    'border': '2px solid white',
    'color': 'white',
    '&:hover': {
      border: '2px solid #cccccc',
      backgroundColor: 'rgba(255, 255, 255, 0.08)', // subtle hover
    },
    '&:active': {
      border: '2px solid #aaaaaa',
      backgroundColor: 'rgba(255, 255, 255, 0.12)', // pressed
    },
  },
}))
