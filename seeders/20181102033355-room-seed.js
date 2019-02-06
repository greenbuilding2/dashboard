'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('room', [
      {
        room_number: '101',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '102',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '103',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '104',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '105',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '106',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '107',
        building_id:2,
        floor_id: 4,
      },
      {
        room_number: '201',
        building_id:2,
        floor_id: 5,
      },
      {
        room_number: '202',
        building_id:2,
        floor_id: 5,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('room', null, {});
  }
};
