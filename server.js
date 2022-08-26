require('dotenv').config()

const TAG = "server.js"

const express = require('express')
const app = express()
const db = require('./models/index').sequelize
const port = process.env.PORT || 8081

const jobFetchLatestVideos = require('./jobs/job.fetch-latest-videos')
//const jobUpdateVideos_tbl = require('./jobs/job.update-videos_tbl')
const router = require('./routers/router.videos')
const basicUtils = require('./utils/basic.utils')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)
global.googleCloudApiKeyIndex = 0 //set default googleCloudApiKey from list of keys in config.js
global.cachedVideoData = [] //save distinct data from 10 sec api calls to yt v3 api
app.listen(port, () => {
   console.log(TAG, `MYT-FM running on port ${port}`)
   db.authenticate().then(() => {
      basicUtils.logger(TAG, `MYT-FM connected to database ${db.config.database}`);
      jobFetchLatestVideos.fetchLatestVideos()
      //jobUpdateVideos_tbl.updateVideosInDb()
   }).catch((err) => {
      basicUtils.logger(TAG, err);
   })
})



