import axios from 'axios'


const API = axios.create({ baseURL: 'http://172.212.58.96:5000/' });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);