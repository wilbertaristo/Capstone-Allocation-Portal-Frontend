import {
    AUTH_ERROR,
    NETWORK_ERROR,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
    PASSWORD_SENT,
    AUTH_SUCCESS,
    CLEAR_AUTH_ERROR
} from "../actions/types";

export default function(state={}, action){
    switch(action.type){
        case AUTH_ERROR:
            return{
                ...state,
                loginError: true,
                message: "Incorrect email or password!"
            }

        case CLEAR_AUTH_ERROR:
            return{
                ...state,
                loginError: false
            }

        default:
            return state;
    }
}

