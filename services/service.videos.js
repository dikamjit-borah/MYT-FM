const db = require('../models/index').sequelize

module.exports = {
    insertIntoVideosTbl: async function () {
        let isInserted = false
        let error
        const query = `INSERT INTO videos_tbl (entry_id, video_id, title, description, publish_time) VALUES (?, ?, ?, ?, ?)`
        try {
            let queryResult = await db.query(query, {
                replacements: [3, "itemId", "itemName", "itemQuantity", new Date()],
                logging: console.log
            })
            isInserted = queryResult ? true : false
        } catch (err) {
            error = "" + err
        }
        return {
            isInserted,
            error
        }
    }
}