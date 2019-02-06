'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('room', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      room_number: {
        type: Sequelize.STRING,
      },
      building_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'building',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      floor_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'floor',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('room');
  }
};