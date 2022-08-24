require('dotenv').config

const TAG = "server.js"

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 8081

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, ()=>{
   console.log(TAG, `MYT-FM running on port ${port}`)
})
