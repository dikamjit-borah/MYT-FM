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
            console.log("err"+ err);
            error = "" + err
        }
        return {
            isInserted,
            error
        }
    }
}