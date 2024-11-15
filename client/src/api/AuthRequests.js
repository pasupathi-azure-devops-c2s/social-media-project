import axios from 'axios'


const API = axios.create({ baseURL: 'http://48.216.181.152:5000' });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);
