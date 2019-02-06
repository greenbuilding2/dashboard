'use strict';
module.exports = function(sequelize, DataTypes) {
  var Floor = sequelize.define('floor', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    floor_number: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 1,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'floor',
    classMethods: {
      associate: function(models) {
        Floor.hasMany(models.room, {
          foreignKey: 'floor_id',
        });

        Floor.belongsTo(models.building, {
          foreignKey: 'building_id',
          allowNull: false,
        });
      },
    },
  });
  return Floor;
};