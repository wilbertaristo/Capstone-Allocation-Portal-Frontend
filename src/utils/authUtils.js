import axios from 'axios';
import { ROOT_URL } from "./index";


export const signinUser = (email, password, history) => {
    console.log('signing in...');
    if (email === 'valid@email.com' && password === "testing123"){
        history.push('/home');
    }
}

export default signinUser;