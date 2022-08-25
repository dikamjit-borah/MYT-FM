'use strict';

const moment = require('moment')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class videos_tbl extends Model {
    static associate(models) {
    }
  }
  videos_tbl.init({
    video_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish_time: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
  }, {
    sequelize,
    modelName: 'videos_tbl',
    tableName: 'videos_tbl',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    indexes: [
      {
        unique: 'false',
        fields: ['video_id']
      }
    ]
  });
  return videos_tbl;
};