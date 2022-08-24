const constants = require('../utils/constants');

module.exports = {
    fetchLatestVideos: function () {
        //this.callSearchApi()
        //setInterval(this.V3searchApiCall, 2000)
    },
    callSearchApi: async function () {
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

        } catch (error) {
            console.log(error);
        }
    }
}