import {
    UPLOAD_REQUIREMENTS,
    UPLOAD_ERROR,
    ADMIN_GET_REQUIREMENTS,
    ADMIN_GET_REQUIREMENTS_ERROR
} from "../actions/types";

export default function(state={}, action){
    switch(action.type){
        case UPLOAD_REQUIREMENTS:
            return{
                ...state,
                uploadSuccess: true
            }

        case UPLOAD_ERROR:
            return{
                ...state,
                uploadError: true
            }

        case ADMIN_GET_REQUIREMENTS:
            return{
                ...state,
                dataSource: action.payload
            }

        case ADMIN_GET_REQUIREMENTS_ERROR:
            return{
                ...state,
                dataSource: null
            }
        
        default:
            return state;
    }
}
