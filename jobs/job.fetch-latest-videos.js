
module.exports = {
    fetchLatestVideos: function () {
        this.V3searchApiCall()
        //setInterval(this.V3searchApiCall, 2000)
    },
    V3searchApiCall: function () {
        const axios = require('axios').default
        axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=${process.env.GC_API_KEY}`)
        .then((response) => console.log(response.data))
        .catch((error)=>console.log(error))
    }
}