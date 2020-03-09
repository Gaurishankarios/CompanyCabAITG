import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.1.166:8080/taxicab/login'
});