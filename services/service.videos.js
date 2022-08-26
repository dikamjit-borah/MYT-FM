const TAG = "service.videos.js"

const db = require('../models/index').sequelize
const basicUtils = require('../utils/basic.utils')



module.exports = {
    insertIntoVideosTbl: async function (rows) {
        let isInserted = false
        let error
        const query = `INSERT INTO videos_tbl (video_id, title, description, publish_time) VALUES ? ON DUPLICATE KEY UPDATE video_id=video_id`
        try {
            let queryResult = await db.query(query, {
                replacements: [rows],
                logging: console.log
            })
            isInserted = queryResult ? true : false
        } catch (err) {
            error = "" + err
            basicUtils.logger(TAG, error)
        }
        return {
            isInserted,
            error
        }
    },
    searchInVideosTbl: async function (searchParam) {
        let isPresent = false
        let error
        let data
        const query = `SELECT video_id, title, description, publish_time FROM videos_tbl WHERE videos_tbl.title like '%${searchParam}%' OR videos_tbl.description like '%${searchParam}%'`
        try {
            const queryResult = await db.query(query, {
                logging: console.log
            })
            isPresent = queryResult && queryResult[0] && queryResult[0].length > 0 ? true : false
            data = queryResult[0]
        } catch (err) {
            error = "" + err
            basicUtils.logger(TAG, error)
        }
        return {
            isPresent,
            data,
            error
        }
    },
    fetchAllFromVideosTbl: async function (offset = 0, limit = 0) {
        let isPresent = false
        let error
        let data
        const query = `SELECT video_id, title, description, publish_time FROM videos_tbl ORDER BY publish_time DESC LIMIT ${offset},${limit}`
        try {
            const queryResult = await db.query(query, {
                logging: console.log
            })
            isPresent = queryResult && queryResult[0] && queryResult[0].length > 0 ? true : false
            data = queryResult[0]
        } catch (err) {
            error = "" + err
            basicUtils.logger(TAG, error)
        }
        return {
            isPresent,
            data,
            error
        }
    }
}