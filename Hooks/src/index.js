import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas'
import './index.css'
import App from './App'
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import orderReducer from './store/reducers/order'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import createSagaMiddleware from 'redux-saga'
import * as serviceWorker from './serviceWorker'

const reducers = combineReducers({
    auth: authReducer,
    order: orderReducer,
    burgerBuilder: burgerBuilderReducer,
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrders)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
