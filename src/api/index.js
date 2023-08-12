import axios from 'axios';

// const API = axios.create({ baseURL: 'your-api-link' });
const API = axios.create({ baseURL: process.env.API_GATEWAY_API });

export const predict_image = (formData, style) => API.post(`/Prod/urlRoute/${style}`, formData);

export const predict_file = (fromData, style) => API.post(`/Prod/upload-image/${style}`, fromData);

export const fetch_labels = (style) => API.get(`/Prod/fetchLabels?labelsType=${style}`)