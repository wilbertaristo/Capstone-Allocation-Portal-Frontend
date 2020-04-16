import {
    UPLOAD_REQUIREMENTS,
    UPLOAD_ERROR,
    CSV_UPLOAD_REQUIREMENTS,
    CSV_UPLOAD_ERROR,
    USER_GET_REQUIREMENTS,
    USER_GET_REQUIREMENTS_ERROR,
    TABLE_LOADING,
    TABLE_UPDATED,
    DESTROY_DATA_SOURCE
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

        case CSV_UPLOAD_REQUIREMENTS:
            return{
                ...state,
                csvUploadSuccess: true
            }

        case CSV_UPLOAD_ERROR:
            return{
                ...state,
                csvUploadError: true
            }

        case USER_GET_REQUIREMENTS:
            return{
                ...state,
                dataSource: action.payload,
                loading: false
            }

        case USER_GET_REQUIREMENTS_ERROR:
            return{
                ...state,
                dataSource: null
            }

        case TABLE_LOADING:
            return{
                ...state,
                loading: true
            }

        case TABLE_UPDATED:
            return{
                ...state,
                tableUpdated: true
            }

        case DESTROY_DATA_SOURCE:
            return{
                ...state,
                dataSource: null
            }
        
        default:
            return state;
    }
}
