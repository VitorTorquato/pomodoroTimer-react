import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/defaults'
import { GlobalStyle } from './styles/global'



import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Routes'



export function App() {

 
  
 return (
  <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
       <BrowserRouter>
        <Router/>   
      </BrowserRouter> 
    </ThemeProvider>
)
}
