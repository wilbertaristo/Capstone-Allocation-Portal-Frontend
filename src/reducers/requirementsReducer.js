import {
    UPLOAD_REQUIREMENTS,
    UPLOAD_ERROR,
    CSV_UPLOAD_REQUIREMENTS,
    CSV_UPLOAD_ERROR,
    USER_GET_REQUIREMENTS,
    USER_GET_REQUIREMENTS_ERROR,
    TABLE_LOADING,
    DESTROY_DATA_SOURCE,
    SKIPPED_PROJECTS,
    CLEAR_SKIPPED_PROJECTS,
    MASS_EMAIL_SENT,
    MASS_EMAIL_ERROR,
    CLEAR_MASS_EMAIL
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

        case DESTROY_DATA_SOURCE:
            return{
                ...state,
                dataSource: null
            }

        case SKIPPED_PROJECTS:
            return{
                ...state,
                skippedProjects: action.payload,
                skippedProjectsCount: action.payloadCount
            }

        case CLEAR_SKIPPED_PROJECTS:
            return{
                ...state,
                skippedProjects: null,
                skippedProjectsCount: null
            }

        case MASS_EMAIL_SENT:
            return{
                ...state,
                sendEmailMessage: action.message
            }

        case MASS_EMAIL_ERROR:
            return{
                ...state,
                sendEmailMessage: action.message
            }

        case CLEAR_MASS_EMAIL:
            return{
                ...state,
                sendEmailMessage: null
            }

        default:
            return state;
    }
}
