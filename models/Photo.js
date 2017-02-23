'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Photo;
};