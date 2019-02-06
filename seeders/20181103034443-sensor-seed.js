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
    return queryInterface.bulkInsert('sensor', [
      {
        name: "temperature sensor",
        status: "active",
        type: "temperature",
        node_id: 1,
        cluster_id: 1,
      },
      {
        name: "motion sensor",
        status: "active",
        type: "motion",
        node_id: 1,
        cluster_id: 1,
      },
      {
        name: "light sensor",
        status: "maintenance",
        type: "light",
        node_id: 1,
        cluster_id: 1,
      },
      {
        name: "temperature sensor",
        status: "maintenance",
        type: "temperature",
        node_id: 2,
        cluster_id: 1,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
