import axios from 'axios'

const API = axios.create({
    baseURL: 'http://124.221.139.189:8101',
    timeout: 20000
})

export default API