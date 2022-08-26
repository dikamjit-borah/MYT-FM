const moment = require('moment')
module.exports = {
    baseUrl: "https://youtube.googleapis.com/youtube/v3",
    searchQuery: "cute cat videos",
    publishedAfter: new Date(moment(new Date()).subtract(2, 'days')).toISOString(),
    endpoints: {
        videoSearch: "/api/v1/video/search",
        videoAll: "/api/v1/video/all"
    },
    messages: {
        SMTHNG_WRNG: "Something went wrong. Please try again",
        SEARCH_SUCCESS: "Search successful",
        SEARCH_EMPTY: "Search unsuccessful. No data found for searched term",
        SEARCH_ERR: "Something went wrong while searching",

        ALLVID_SUCCESS: "All videos fetched successfully",
        ALLVID_EMPTY: "Video fetch unsuccessful. No data found",
        ALLVID_ERR: "Something went wrong while fetching videos"
    }
    
}