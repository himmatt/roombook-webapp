import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './routes'
import { store } from './store/store'
import { Provider } from 'react-redux'
import AuthInitializer from './store/AuthInitializer'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthInitializer>
          <Router />
        </AuthInitializer>
      </BrowserRouter>
    </Provider>
  )
}

export default App
