'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('building', {
      id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      image_url: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      num_of_floors: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 1
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
    },{timestamps: false});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('building');
  }
};