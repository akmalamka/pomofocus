import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

export const CoreInputField = styled(TextField)(() => ({
  'width': '800px', // customize width
  '& .MuiInputBase-input': {
    'fontFamily': 'SF Pro Display, sans-serif', // value text
    'textAlign': 'center', // center text
    'fontSize': '32px',
    'color': '#EEEEEE',
    '::placeholder': {
      color: '#EEEEEE', // placeholder color
      fontSize: '45px', // placeholder font size
    },
    '::selection': {
      color: '#EEEEEE', // selected text color
      backgroundColor: '#FF0000', // example: red highlight bg (customize)
    },
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid #EEEEEE', // default underline
  },
  '& .MuiInput-underline:after': {
    borderBottom: '3px solid #EEEEEE', // focused
  },
}))

export default CoreInputField
