import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'

import store from 'src/reducers'


const MainLayout = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
      </Router>
    </Provider>
  )
}

export default MainLayout