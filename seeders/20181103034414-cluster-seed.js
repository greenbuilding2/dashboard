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
    return queryInterface.bulkInsert('cluster', [
      {
        floor_id: 4,
        name: "cluster 1",
        status: "active",
        building_id: 2,
      },
      {
        floor_id: 5,
        name: "cluster 2",
        status: "inactive",
        building_id: 2,
      },
      {
        floor_id: 6,
        name: "cluster 3",
        status: "active",
        building_id: 2,
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
    return queryInterface.bulkDelete('cluster', null, {});
  }
};
