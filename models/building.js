'use strict';
module.exports = function(sequelize, DataTypes) {
  var Building = sequelize.define('building', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    image_url: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zipcode: {
      type: DataTypes.STRING,
    },
    num_of_floors: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 1,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'building',
    classMethods: {
      associate: function(models) {
        Building.hasMany(models.cluster, {
          foreignKey: 'building_id',
        });
        Building.hasMany(models.floor, {
          foreignKey: 'building_id',
        });
      },
    },
  });
  return Building;
};