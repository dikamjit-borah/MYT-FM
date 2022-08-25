const serviceVideos = require('../services/service.videos');

const db = require('../models/index').sequelize

module.exports = {
    videoSearch: async function (req, res) {
        const searchParam = req.query.searchParam
        console.log(searchParam);
        const result = await serviceVideos.searchInVideosTbl(searchParam)
        res.status(200).send(result)
    },
    videoAll: async function (req, res) {
        let page = req.query.page && req.query.page != "0" && !isNaN(req.query.page) ? req.query.page : 1
        let limit = req.query.limit && req.query.limit != "0" && !isNaN(req.query.limit) ? req.query.limit : 10

        //assuming client sends page starting from 1, return ${limit} no of rows from offseted row
        const offset = (page - 1) * limit
        const result = await serviceVideos.fetchAllFromVideosTbl(offset, limit)
        res.status(200).send(result)
    }
}