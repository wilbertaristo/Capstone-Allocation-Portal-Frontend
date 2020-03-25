import {
    UPLOAD_REQUIREMENTS,
    UPLOAD_ERROR
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

        
        default:
            return state;
    }
}
