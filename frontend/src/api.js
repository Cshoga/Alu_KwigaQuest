import axios from 'axios'
const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'
const client = axios.create({baseURL:API})
client.interceptors.request.use(cfg=>{const token = localStorage.getItem('token');if(token) cfg.headers.Authorization = 'Bearer '+token;return cfg})
export default client
