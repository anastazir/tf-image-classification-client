import axios from 'axios';

// const API = axios.create({ baseURL: 'your-api-link' });
const API = axios.create({ baseURL: "https://k86b32et99.execute-api.ap-south-1.amazonaws.com" + "/Prod"});

export const predict_image = (formData, style) => API.post(`/urlRoute/${style}`, formData);

export const predict_file = (fromData, style) => API.post(`/urlRoute/${style}`, fromData);

export const fetch_labels = (style) => API.get(`/fetchLabels?labelsType=${style}`)