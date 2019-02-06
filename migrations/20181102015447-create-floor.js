'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('floor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      floor_number: {
        type: Sequelize.INTEGER
      },
      building_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'building',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('floor');
  }
};