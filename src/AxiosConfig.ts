import axios from 'axios'

// Substituir a baseUrl pela do nosso back end
export const AxiosAPI = axios.create({
  baseURL: 'https://api.chucknorris.io',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
