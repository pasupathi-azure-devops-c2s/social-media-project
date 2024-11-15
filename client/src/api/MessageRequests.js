import axios from 'axios'


const API = axios.create({ baseURL: 'http://48.216.181.152:5000' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);