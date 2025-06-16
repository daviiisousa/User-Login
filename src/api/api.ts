import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://usuarios-api-xz2w.onrender.com'
})