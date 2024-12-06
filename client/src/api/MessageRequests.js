import axios from 'axios'


const API = axios.create({ baseURL: 'http://172.171.48.51:5000/' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);