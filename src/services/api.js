import axios from 'axios';

const API_BASE_URL = 'http://gainlove-api-v2.test/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const dashboardAPI = {
  getStats: () => api.get('/dashboard'),
  
  getPrograms: () => api.get('/programs'),
  createProgram: (programData) => api.post('/programs', programData),
  updateProgram: (id, programData) => api.put(`/programs/${id}`, programData),
  deleteProgram: (id) => api.delete(`/programs/${id}`),
  
  getNews: () => api.get('/news'),
  createNews: (newsData) => api.post('/news', newsData),
  updateNews: (id, newsData) => api.put(`/news/${id}`, newsData),
  deleteNews: (id) => api.delete(`/news/${id}`),
  
  getPartners: () => api.get('/partners'),
  createPartner: (partnerData) => api.post('/partners', partnerData),
  updatePartner: (id, partnerData) => api.put(`/partners/${id}`, partnerData),
  deletePartner: (id) => api.delete(`/partners/${id}`),
  
  getMessages: () => api.get('/messages'),
  deleteMessage: (id) => api.delete(`/messages/${id}`),
  
  logout: () => api.post('/logout'),
};

export const programAPI = {
  getProgramById: (id) => api.get(`/programs/${id}`),
  getPrograms: () => api.get('/programs'),
  createProgram: (formData) =>
    api.post('/programs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

updateProgram: (id, formData) =>
  api.post(`/programs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

}

export const newsAPI = {
    getNewsById: (id) => api.get(`/news/${id}`),
  getNews: () => api.get('/news'),
  createNews: (formData) =>
    api.post('/news', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

updateNews: (id, formData) =>
  api.post(`/news/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

}

export const partnerAPI = {
    getPartnerById: (id) => api.get(`/partners/${id}`),
  getPartners: () => api.get('/partners'),
  createPartner: (formData) =>
    api.post('/partners', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

updatePartner: (id, formData) =>
  api.post(`/partners/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

}

export const messageAPI = {
  getMessages: () => api.get('/messages'),
  createMessage: (messageData) => api.post('/messages', messageData),
  deleteMessage: (id) => api.delete(`/messages/${id}`),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  // register: (userData) => api.post('/register', userData),
  // getCurrentUser: () => api.get('/me'),
};

export default api;