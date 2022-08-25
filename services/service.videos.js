const db = require('../models/index').sequelize

module.exports = {
    insertIntoVideosTbl: async function (rows) {
        let isInserted = false
        let error
        const query = `INSERT INTO videos_tbl (video_id, title, description, publish_time) VALUES ?`
        try {
            let queryResult = await db.query(query, {
                replacements: [rows],
                logging: console.log
            })
            isInserted = queryResult ? true : false
        } catch (err) {
            console.log("err" + err);
            error = "" + err
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
        const query = `SELECT * FROM videos_tbl WHERE videos_tbl.title like '%${searchParam}%' OR videos_tbl.description like '%${searchParam}%'`
        try {
            const queryResult = await db.query(query, {
                logging: console.log
            })
            isPresent = queryResult && queryResult[0] && queryResult[0].length>0 ? true : false
            data = queryResult[0]
        } catch (err) {
            console.log(err);
            error = ""+error
        }
        return {
            isPresent,
            data,
            error
        }
    }
}