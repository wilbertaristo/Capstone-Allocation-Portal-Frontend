import {
    AUTH_ERROR,
    AUTH_USER,
    UNAUTH_USER,
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

        case AUTH_USER:
            return{
                ...state,
                loginError: null,
                authenticated: true
            }

        case UNAUTH_USER:
            return{
                authenticated: false
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

