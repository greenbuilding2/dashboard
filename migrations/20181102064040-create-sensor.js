'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensor', {
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
        allowNull: false,
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
      node_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'node',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sensor');
  }
};