const moment = require('moment')
module.exports = {
    baseUrl: "https://youtube.googleapis.com/youtube/v3",
    searchQuery: "cute cat videos",
    endpoints: {
        videoSearch: "/api/v1/video/search",
        videoAll: "/api/v1/video/all"
    },
    publishedAfter: new Date(moment(new Date()).subtract(2, 'days')).toISOString()
}