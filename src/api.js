import axios from 'axios';

// Local dev (Vite proxy): leave empty string
axios.defaults.baseURL = 'https://asteradmin.stldigitaltech.com:3000';

axios.defaults.withCredentials = true;

// Helper for fetch calls so they also hit the correct backend
export const apiUrl = (path) => `${axios.defaults.baseURL}${path}`;

export default axios;
