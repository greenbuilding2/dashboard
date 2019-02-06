module.exports = (sequelize, DataTypes) => {
  let Cluster = sequelize.define('cluster', {
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
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'cluster',
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        Cluster.belongsTo(models.building, {
          foreignKey: 'building_id',
        });
        Cluster.belongsTo(models.floor, {
          foreignKey: 'floor_id',
        });
        Cluster.hasMany(models.node, {
          foreignKey: 'cluster_id',
          sourceKey: 'id'
        });
      },
    },
  });
  return Cluster;
}