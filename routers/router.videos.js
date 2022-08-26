const express = require('express')
const controllerVideo = require('../controllers/controller.video')
const constants = require('../utils/constants')
const router = express.Router()

router.get(
    constants.endpoints.videoSearch,
    controllerVideo.videoSearch
)

router.get(
    constants.endpoints.videoAll,
    controllerVideo.videoAll
)

module.exports = router