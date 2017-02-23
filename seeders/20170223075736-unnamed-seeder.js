'use strict';

var Photos = [
  {
    title: 'Japan Temple At Night',
    author: 'Andrea',
    link: `https://s3.amazonaws.com/web-ready-andrea/japan-temple.png`,
    description: `Sirene is a luxurious restaurant placed at Aker Brygge, where Oslo meets the fjord. We wanted to bring in aspects of nature into this very urban area. The building is designed with layers of flexible and transparent facades.`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Nepal Bells',
    author: 'Andrea',
    link: `https://s3.amazonaws.com/web-ready-andrea/nepal-bells.png`,
    description: `Sirene is a luxurious restaurant placed at Aker Brygge, where Oslo meets the fjord. We wanted to bring in aspects of nature into this very urban area. The building is designed with layers of flexible and transparent facades.`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Portugal Blue House',
    author: 'Andrea',
    link: `https://s3.amazonaws.com/web-ready-andrea/portugal-blue-house.png`,
    description: `Sirene is a luxurious restaurant placed at Aker Brygge, where Oslo meets the fjord. We wanted to bring in aspects of nature into this very urban area. The building is designed with layers of flexible and transparent facades.`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Photos', Photos);

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

    return queryInterface.bulkDelete('Photos', Photos);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
