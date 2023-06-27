import axios from 'axios';

const BASE_URL = 'https://gateway.scan-interfax.ru';

const scanApi = axios.create({
    baseURL: BASE_URL,
})

scanApi.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers.Accept = 'application/json';
    config.headers.Authorization = localStorage.getItem('token') != null? `Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}` : '';
    return config;
});

export const login = async (login, password) => {
    return scanApi.post('/api/v1/account/login', {login, password})
}

export const accInfo = async () => {
    return scanApi.get('/api/v1/account/info')
}

export const reqHistograms = async (params) => {
    return scanApi.post('/api/v1/objectsearch/histograms', params)
}

export const reqObjectSearch = async (params) => {
    return scanApi.post('/api/v1/objectsearch', params)
}

export const reqDocuments = async (params) => {
    return scanApi.post('/api/v1/documents', params)
}

