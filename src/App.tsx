import { ThemeProvider } from '@mui/material'
import './App.css'
import LayoutMain from './layouts/LayoutMain'
import Home from './pages/Home'
import theme from './theme'

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
