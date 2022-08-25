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
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'videos_tbl',
    tableName: 'videos_tbl',
    indexes:[
      {
          unique: 'false',
          fields:['video_id']
      }
  ]

    
  });
  return videos_tbl;
};