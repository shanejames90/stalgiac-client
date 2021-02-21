import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { SnackbarProvider } from 'notistack'

import App from './App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <SnackbarProvider
      maxSnack={3}
      content={(key, message) => (
        <msgAlerts id={key} message={message} />
      )}
    >
      <App />
    </SnackbarProvider>
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
