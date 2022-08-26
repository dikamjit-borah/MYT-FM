const TAG = "controller.video.js"

const httpStatus = require('http-status');
const serviceVideos = require('../services/service.videos');
const basicUtils = require('../utils/basic.utils');
const constants = require('../utils/constants');

const db = require('../models/index').sequelize

module.exports = {
    videoSearch: async function (req, res) {
        basicUtils.logger(TAG, `Hitting ${constants.endpoints.videoSearch}`)
        try {
            const searchParam = req.query.searchParam
            const result = await serviceVideos.searchInVideosTbl(searchParam)
            if (result) {
                if (result.error) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SEARCH_ERR, result.error)
                return result.isPresent ? basicUtils.generateResponse(res, httpStatus.OK, constants.messages.SEARCH_SUCCESS, result.data) : basicUtils.generateResponse(res, httpStatus.OK, constants.messages.SEARCH_EMPTY)
            }
        } catch (err) {
            basicUtils.logger(TAG, "" + err)
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SMTHNG_WRNG, { error: "" + err })
        }
        return basicUtils.generateResponse()
    },

    videoAll: async function (req, res) {
        basicUtils.logger(TAG, `Hitting ${constants.endpoints.videoAll}`)
        try {
            let page = req.query.page && req.query.page != "0" && !isNaN(req.query.page) ? req.query.page : 1
            let limit = req.query.limit && req.query.limit != "0" && !isNaN(req.query.limit) ? req.query.limit : 10

            //assuming client sends page starting from 1, return ${limit} no of rows from offseted row
            const offset = (page - 1) * limit
            const result = await serviceVideos.fetchAllFromVideosTbl(offset, limit)
            if (result) {
                if (result.error) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ALLVID_ERR, result.error)
                return result.isPresent ? basicUtils.generateResponse(res, httpStatus.OK, `${constants.messages.ALLVID_SUCCESS} for page ${page} showing ${limit} results`, result.data) : basicUtils.generateResponse(res, httpStatus.OK, `${constants.messages.ALLVID_EMPTY} for page ${page}`)
            }
        } catch (err) {
            basicUtils.logger(TAG, "" + err)
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SMTHNG_WRNG, { error: "" + err })
        }
        return basicUtils.generateResponse()
    }
}