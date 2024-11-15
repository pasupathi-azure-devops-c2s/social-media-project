import axios from 'axios'


const API = axios.create({ baseURL: 'http://135.237.17.14:5000' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);