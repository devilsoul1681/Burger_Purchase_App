import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import thunk from "redux-thunk"
import burgerBuildeReducer from "./store/reducer/burgerBuilder"
import orderReducer from "./store/reducer/order"
import authReducer from "./store/reducer/auth"

const rootReducer=combineReducers({
    burgerBuilder:burgerBuildeReducer,
    order:orderReducer,
    auth:authReducer
})

const composeEnhancers = process.env.NODE_ENV==="development"?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
