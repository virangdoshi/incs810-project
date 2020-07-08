import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'

import store from 'src/reducers'
import Hashbox from 'src/components/hashbox'


const MainLayout = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Hashbox />
      </Router>
    </Provider>
  )
}

export default MainLayout