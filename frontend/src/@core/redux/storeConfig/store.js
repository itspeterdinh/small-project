/* eslint-disable */
// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'

// ** init middleware
const middleware = [thunk, createDebounce()]

// ** Dev Tools
const composeEnhancers = process.browser ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : (params) => params

// ** Create store
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

export { store }
