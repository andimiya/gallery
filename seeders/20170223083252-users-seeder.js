var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('password', salt);

var Users = [
{
  username: 'FirstUser',
  password: hash,
  createdAt: new Date(),
  updatedAt: new Date()
}];

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', Users);

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', Users);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
