import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import DashLayout from './components/DashLayout'
import NoteList from './features/notes/NoteList'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f2f2f'
    },
    background: {
      paper: '#A5B68D'
    }
  },
  typography: {
    fontFamily: 'Raleway'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/">
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path="notes">
              <Route index element={<NoteList />} />
            </Route>
            
          </Route>

        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App