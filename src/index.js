import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { AUTH_USER } from './actions/types';

import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';
import rootReducer from "./reducers";
import { Provider } from "react-redux";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('token');
if (token){
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
