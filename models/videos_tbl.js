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
    entry_id: DataTypes.INTEGER,
    video_id: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publish_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'videos_tbl',
  });
  return videos_tbl;
};