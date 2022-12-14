const TAG = "job.fetch-latest-video.js"

const config = require('../config/_config');
const serviceVideos = require('../services/service.videos');
const basicUtils = require('../utils/basic.utils');
const constants = require('../utils/constants');
const responseParser = require('../utils/response.parser');

module.exports = {

    fetchLatestVideos: function () {
        //this.callV3SearchApi()

        //callback in setInterval will make the axios call to fetch latest yt videos for searched terms
        setInterval(this.callV3SearchApi, config.apiCallInterval)
    },

    callV3SearchApi: async function () {
        //function to make the axios call to fetch search results
        try {
            const axiosInstance = await require('../modules/axios.instance').axiosInstanceYoutube()
            let apiKey = config.apiKeys.googleCloud[global.googleCloudApiKeyIndex]

            //axios interceptor to log requests before making them
            axiosInstance.interceptors.request.use(function (config) {
                basicUtils.logger(TAG, `Hitting ${config.baseURL.replace(/\/+$/, '') + axiosInstance.getUri(config)}`)
                return config
            }, function (error) {
                return Promise.reject(error)
            })

            const result = await axiosInstance.get('/search', {
                params: {
                    key: apiKey,
                    maxResults: 10,
                    q: constants.searchQuery,
                    type: 'video',
                    order: 'date',
                    publishedAfter: constants.publishedAfter,
                    part: 'snippet'
                }
            })

            let videoData = responseParser.parseV3searchApi(result.data)
            module.exports.updateVideosInDb(videoData)

        } catch (err) {
            if (err.response && err.response.status) {
                if (err.response.status == 403) { // forbidden => wrong api key/ quota exceeded 
                    let nextIndex = global.googleCloudApiKeyIndex + 1
                    if (((nextIndex) < config.apiKeys.googleCloud.length) && (config.apiKeys.googleCloud[nextIndex])) { // move to the next api key if it is within the array && key exists
                        global.googleCloudApiKeyIndex += 1
                        this.callV3SearchApi()// call api with new api key
                    } else global.googleCloudApiKeyIndex = 0 //start again from the first api key
                }
            }
            if (err.code)
                console.log(err.code);
            else
                console.log(err);
        }
    },

    updateVideosInDb: async function (videoData) {
        try {
            if (videoData && videoData.length > 0) {
                let videoDataRows = videoData.map(element => Object.values({ ...element, publishedAt: new Date(element.publishedAt) })); //convert into array of arrays of values for bulk insert format
                let { isInserted, error } = await serviceVideos.insertIntoVideosTbl(videoDataRows) //service function call returns whether insertion successful or error
                //handle cases 1. if insertion is successful 2. in case of error
                if (isInserted) basicUtils.logger(TAG, `videos_tbl updated successfully`);
                if (error) basicUtils.logger(TAG, error)
            }
        }
        catch (err) {
            basicUtils.logger(TAG, ""+err)
        }

    }
}