'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class videos_tbl extends Model {
    static associate(models) {
    }
  }
  videos_tbl.init({
    entry_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    video_id: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish_time: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'videos_tbl',
    tableName: 'videos_tbl'
  });
  return videos_tbl;
};