import axios from 'axios';

// axios service for api call
const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
});

axiosService.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.headers["Accept"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Content-type"] = "application/json";
    
    return config;
});

export default axiosService;