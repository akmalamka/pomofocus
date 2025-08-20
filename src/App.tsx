import { ThemeProvider } from '@mui/material'
import LayoutMain from './layouts/LayoutMain'
import Home from './pages/Home'
import theme from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LayoutMain>
        <Home />
      </LayoutMain>
    </ThemeProvider>
  )
}

export default App
