const axios = require('axios')
module.exports = {
    axiosInstanceYoutube: async function () {
        let _axiosInstanceYoutube
        if (!_axiosInstanceYoutube) {
            _axiosInstanceYoutube = axios.create({
                baseURL: 'https://youtube.googleapis.com/youtube/v3',
                timeout: 10000,
                //headers: {'X-Custom-Header': 'foobar'}
            });
        }
        return _axiosInstanceYoutube
    }
}
