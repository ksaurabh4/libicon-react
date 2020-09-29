import axios from 'axios';
const api = axios.create({
  baseURL:
    'https://api.libitech.in',
});

export default api;