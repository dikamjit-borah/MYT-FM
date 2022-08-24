'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "videos_tbl", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "migration",
    "created": "2022-08-24T19:28:14.057Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "videos_tbl",
        {
            "entry_id": {
                "type": Sequelize.INTEGER,
                "field": "entry_id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "video_id": {
                "type": Sequelize.STRING,
                "field": "video_id"
            },
            "title": {
                "type": Sequelize.STRING,
                "field": "title"
            },
            "description": {
                "type": Sequelize.STRING,
                "field": "description"
            },
            "publish_time": {
                "type": Sequelize.DATE,
                "field": "publish_time"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": new Date()
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "defaultValue": new Date()
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
