const serviceVideos = require('../services/service.videos');

const db = require('../models/index').sequelize

module.exports = {
    videoSearch: async function(req, res){
       const searchParam = req.query.searchParam
       console.log(searchParam);
       const result = await serviceVideos.searchInVideosTbl(searchParam)
       res.status(200).send(result)
    }
}