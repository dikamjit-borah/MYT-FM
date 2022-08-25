'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "videos_tbl", deps: []
 * addIndex "videos_tbl_video_id" to table "videos_tbl"
 *
 **/

var info = {
    "revision": 1,
    "name": "migration_file",
    "created": "2022-08-25T17:13:51.350Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "videos_tbl",
            {
                "video_id": {
                    "type": Sequelize.STRING,
                    "field": "video_id",
                    "allowNull": false,
                    "primaryKey": true
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
                    "defaultValue": Sequelize.Date
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "defaultValue": Sequelize.Date
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "videos_tbl",
            ["video_id"],
            {
                "indexName": "videos_tbl_video_id",
                "name": "videos_tbl_video_id",
                "indicesType": "UNIQUE",
                "type": "UNIQUE"
            }
        ]
    }
];

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
