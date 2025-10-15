import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI backend URL

export const uploadImageForAnalysis = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const generateReport = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/generate_report`, data, {
    responseType: 'blob', // Important for downloading files
  });
  return response.data;
};
