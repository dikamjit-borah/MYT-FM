const config = require('../config/config');
const serviceVideos = require('../services/service.videos');
const constants = require('../utils/constants');
const responseParser = require('../utils/response.parser');

module.exports = {
    fetchLatestVideos: function () {
        this.callV3SearchApi()
        //callback in setInterval will make the axios call to fetch latest yt videos for searched terms
        //setInterval(this.V3searchApiCall, 2000)
    },
    callV3SearchApi: async function () {
        //function to make the axios call to fetch search results
        try {
            const axiosInstance = await require('../modules/axios.instance').axiosInstanceYoutube()
            let apiKey = config.apiKeys.googleCloud[global.googleCloudApiKeyIndex]
            console.log(apiKey);
            const result = await axiosInstance.get('/search', {
                params: {
                    key: apiKey,
                    maxResults: 25,
                    q: constants.searchQuery,
                    type: 'video',
                    order: 'date',
                }
            })
            let videoData = responseParser.parseV3searchApi(result.data)
            if (videoData && videoData.length > 0) {
                console.log(videoData);
            }
            let { isInserted, error } = await serviceVideos.insertIntoVideosTbl() //service function call returns whether insertion successful or error

            //handle cases 1. if insertion is successful 2. in case of error
            if (isInserted) console.log(`Latest videos updated in database`);
            if (error) console.log(error);

        } catch (error) {
            if (error.response && error.response.status) {
                if (error.response.status == 403) { // forbidden => wrong api key/ quota exceeded 
                    let nextIndex = global.googleCloudApiKeyIndex + 1
                    if (((nextIndex) < config.apiKeys.googleCloud.length) && (config.apiKeys.googleCloud[nextIndex])) { // move to the next api key if it is within the array && key exists
                        global.googleCloudApiKeyIndex += 1
                        this.callV3SearchApi()// call api with new api key
                    } else global.googleCloudApiKeyIndex = 0 //start again from the first api key
                }
            }
            console.log(error.response.status + error.response.statusText);
        }
    }
}