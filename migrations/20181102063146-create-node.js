'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('node', {
      id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
      },
      series_number: {
        type: Sequelize.STRING,
      },
      install_time: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cluster_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'cluster',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      room_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'room',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('node');
  }
};