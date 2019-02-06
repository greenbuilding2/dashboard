'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cluster', {
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
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cluster');
  }
};