import axios from 'axios'

// Substituir a baseUrl pela do nosso back end
export const AxiosAPI = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': [
      'OPTIONS',
      'POST',
      'PUT',
      'GET',
      'DELETE',
      'PATCH',
    ],
  },
  withCredentials: true,
})
