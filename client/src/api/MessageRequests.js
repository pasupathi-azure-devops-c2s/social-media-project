import axios from 'axios'


const API = axios.create({ baseURL: 'http://65.2.69.137:5000' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);