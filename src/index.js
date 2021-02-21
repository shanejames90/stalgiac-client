import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { SnackbarProvider } from 'notistack'

import CustomizedSnackbars from './components/AutoDismissAlert/SnackAlerts.js'

import App from './App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <SnackbarProvider
      maxSnack={3}
      content={(key, message) => (
        <CustomizedSnackbars id={key} message={message} />
      )}
    >
      <App />
    </SnackbarProvider>
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
