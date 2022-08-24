const express = require('express')
const controllerVideo = require('../controllers/controllerVideo')
const constants = require('../utils/constants')
const router = express.Router()

router.get(
    constants.endpoints.videoSearch,
    controllerVideo.videoSearch
)

module.exports = router