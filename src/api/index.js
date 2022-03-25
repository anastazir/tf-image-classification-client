import axios from 'axios';

const API = axios.create({ baseURL: 'https://tf-image-classification-server.herokuapp.com' });

export const predict_image = (formData, style) => API.post(`/urlRoute/${style}`, formData);

export const predict_file = (fromData, style) => API.post(`/upload-image/${style}`, fromData);

export const fetch_labels = (style) => API.get(`/fetchLabels?labelsType=${style}`)