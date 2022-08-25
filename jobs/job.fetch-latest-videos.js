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
            axiosInstance.interceptors.request.use(function (config) {
                console.log(config.baseURL.replace(/\/+$/, '') + axiosInstance.getUri(config))
                return config
              }, function (error) {
                return Promise.reject(error)
              })
            /* const result = await axiosInstance.get('/search', {
                params: {
                    key: apiKey,
                    maxResults: 25,
                    q: constants.searchQuery,
                    type: 'video',
                    order: 'date',
                    part: 'snippet'
                }
            }) */
            
            //let videoData = responseParser.parseV3searchApi(result.data)
            /* {
                videoId: '1fbAG2njIxQ',
                title: '❤️❤️❤️Cute Cat videos compilation 2022❤️❤️❤️ #tiktok #shorts #catvideos',
                description: 'Cute cat videos || Cat videos compilation 2022 ||Funny cat videos2022|| Atb Animal videos #shorts #cats #funnycatvideos ...',
                publishedAt: '2022-08-25T07:02:32Z'
              }, */
            let videoData = [
                {
                  videoId: '1fbAG2njIxQ',
                  title: 'Cute Cat videos compilation 2022 #tiktok #shorts #catvideos',
                  description: 'Cute cat videos || Cat videos compilation 2022 ||Funny cat videos2022|| Atb Animal videos #shorts #cats #funnycatvideos ...',
                  publishedAt: new Date('2022-08-25T07:02:32Z')
                },
                {
                  videoId: 'J_L39kR9zuw',
                  title: 'cat videos for kids,funny cat and dog videos,cat sweet sound.funny cat, Cute cat , Funny cat videos,',
                  description: '',
                  publishedAt: new Date('2022-08-25T06:33:25Z')
                },
                
              ]
            if (videoData && videoData.length > 0) {
               // console.log(videoData);
            }
            let videoDataRows = videoData.map(element => Object.values(element));
            let { isInserted, error } = await serviceVideos.insertIntoVideosTbl(videoDataRows) //service function call returns whether insertion successful or error

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
            console.error(error);
        }
    }
}