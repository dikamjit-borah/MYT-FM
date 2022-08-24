const serviceVideos = require('../services/service.videos');
const constants = require('../utils/constants');

module.exports = {
    fetchLatestVideos: function () {
        this.callSearchApi()
        //callback in setInterval will make the axios call to fetch latest yt videos for searched terms
        //setInterval(this.V3searchApiCall, 2000)
    },
    callSearchApi: async function () {
        //function to make the axios call to fetch search results
        const axiosInstance = await require('../modules/axios.instance').axiosInstanceYoutube()
        try {
            const result = await axiosInstance.get('/search', {
                params: {
                    key: process.env.GC_API_KEY,
                    maxResults: 25,
                    q: constants.searchQuery,
                    type: 'video',
                    order: 'date',
                }
            })
            console.log(result.data.pageInfo);
            let { isInserted, error } = await serviceVideos.insertIntoVideosTbl() //service function call returns whether insertion successful or error
            
            //handle cases 1. if insertion is successful 2. in case of error
            if (isInserted) console.log(`Latest videos updated in database`);
            if (error) console.log(error);

        } catch (error) {
            console.log(error);
        }
    }
}