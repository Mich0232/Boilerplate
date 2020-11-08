import React from 'react'
import { Router } from '@reach/router'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from './layout/theme'
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
  * {
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.primary}
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    max-width: 100vw;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout path='/'>
          <Homepage default/>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
