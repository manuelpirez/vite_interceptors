import axios from 'axios';
import {GET_ANON_TOKEN, FEEDBACK_URL, TOKEN_VERIFY} from "../constants/endpoints.jsx";
//import useAuth from "../hooks/useAuth.jsx";

const BASE_URL = 'http://localhost:3000';

// no interceptors
const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json', 'test': 'api'},
    withCredentials: true
});

const api = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

// FORMS
// export const feedback =  (feedback) => {
//     return  publicApi.post(FEEDBACK_URL, {feedback});
// };
// export const userPasslogin =  ({user, pwd}) => {
//     return  publicApi.post(TOKEN_VERIFY,
//         JSON.stringify({user, pwd}));
// };
export const getAnonToken =  () => {
    return  api.get(GET_ANON_TOKEN)
};


export default publicApi;
