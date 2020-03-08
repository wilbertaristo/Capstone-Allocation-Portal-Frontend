import {combineReducers} from 'redux'

import authReducer from "./authReducer";

import { UNAUTH_USER } from "../actions/types";

const combinedReducer = combineReducers({
    auth: authReducer
});

const rootReducer = (state, action) => {
    if (action.type === UNAUTH_USER){
        state = {}
    }

    return combinedReducer(state, action);
}

export default rootReducer;






