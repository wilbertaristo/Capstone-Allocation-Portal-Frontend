import axios from 'axios';
import { ROOT_URL } from "../utils";
import {
    UNAUTH_USER,
    AUTH_ERROR,
    NETWORK_ERROR,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
    PASSWORD_SENT
} from "./types";

const defaultToken = localStorage.getItem('token');
if (defaultToken) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + defaultToken;
}

export const signinUser = (email, password, history, dispatch) => {
    console.log('signing in...');
    axios.get(`${ROOT_URL}/auth/login`,
        {
            auth: {
                username: email,
                password: password
            }
        })
        .then(loginResponse => {
            console.log(loginResponse);
            const { token } = loginResponse.data;
            localStorage.setItem('token', token);

            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            console.log(token);
            history.push('/home')
        })
        .catch(loginError => {
            console.log(loginError);
            dispatch ({
                type: AUTH_ERROR
            })
        })
}

export default signinUser;