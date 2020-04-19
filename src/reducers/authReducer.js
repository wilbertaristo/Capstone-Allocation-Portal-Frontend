import {
    AUTH_ERROR,
    AUTH_USER,
    UNAUTH_USER,
    NETWORK_ERROR,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
    PASSWORD_SENT,
    AUTH_SUCCESS,
    CLEAR_AUTH_ERROR,
    SIGNUP_USER,
    SIGNUP_ERROR,
    GET_USER_DETAILS,
    GET_USER_DETAILS_ERROR,
    UPDATE_USER_DETAILS,
    UPDATE_USER_DETAILS_ERROR
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

        case SIGNUP_USER:
            return{    
                signupSuccess: true
            }

        case SIGNUP_ERROR:
            return{
                signupError: true
            }

        case UPDATE_USER_DETAILS:
            return{
                updateDetailsSuccess: true,
                authenticated: true
            }

        case UPDATE_USER_DETAILS_ERROR:
            return{
                updateDetailsError: true
            }   


        case GET_USER_DETAILS:
            return{
                ...state,
                userDetails: action.payload,
                loading: false
            }

        case GET_USER_DETAILS_ERROR:
            return{
                ...state,
                userDetails: null
            }

        default:
            return state;
    }
}

