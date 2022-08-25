require('dotenv').config()

const TAG = "server.js"

const express = require('express')
const app = express()
const db = require('./models/index').sequelize
const port = process.env.PORT || 8081

const jobFetchLatestVideos = require('./jobs/job.fetch-latest-videos')
const router = require('./routers/router.videos')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)
global.googleCloudApiKeyIndex = 0 //set default googleCloudApiKey from list of keys in config.js
app.listen(port, () => {
   console.log(TAG, `MYT-FM running on port ${port}`)
   db.authenticate().then(() => {
      console.log(TAG, `MYT-FM connected to database`);
      jobFetchLatestVideos.fetchLatestVideos()
   }).catch((error) => {
      console.log(error);
   })
})



