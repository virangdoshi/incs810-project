import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
// import DevTools from './containers/DevTools'

const store = createStore(
  combineReducers({
  }),
  compose(
    applyMiddleware(thunk),
    // DevTools.instrument()
  )
)

export default store