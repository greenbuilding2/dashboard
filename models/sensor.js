module.exports = (sequelize, DataTypes) => {
  let Sensor= sequelize.define('sensor', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    series_number: {
      type: DataTypes.STRING,
    },
    install_time: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'sensor',
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        Sensor.belongsTo(models.node, {
          foreignKey: 'node_id',
          allowNull: false,
        });
        Sensor.belongsTo(models.cluster, {
          foreignKey: 'cluster_id',
          allowNull: false,
        });
      },
    },
  });
  return Sensor;
}