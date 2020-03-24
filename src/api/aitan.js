import axios from 'axios'

export default axios.create({
    baseURL: 'http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/'
});