var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {

        // associations can be defined here
      }
    }

  });
  return User;
};