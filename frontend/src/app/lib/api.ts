import axios from 'axios';

// Backend API URL — configure via NEXT_PUBLIC_API_BASE_URL in frontend/.env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const uploadImageForAnalysis = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData);
    return response.data;
  } catch (err: unknown) {
    let message = 'Upload failed';
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.detail || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }
    throw new Error(message);
  }
};

// Legacy PDF generation removed per new flow

export const recordConsent = async (filename: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/consent`, { filename });
    return response.data;
  } catch (err: unknown) {
    let message = 'Consent failed';
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.detail || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }
    throw new Error(message);
  }
};
