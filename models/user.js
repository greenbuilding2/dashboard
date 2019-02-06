const bcrypt = require('bcrypt');

// Hashes the password for a user object.
function hashPassword(user) {
  if(user.changed('password')) {
    return bcrypt.hash(user.password, 10).then(function(password) {
      user.password = password;
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email:  {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'user',
    instanceMethods: {
      comparePasswords: function (password, callback) {
        bcrypt.compare(password, this.password, function(error, isMatch) {
          if(error) {
            return callback(error);
          }
          return callback(null, isMatch);
        });
      }
    },
    hooks: {
      beforeValidate: function (user) {
        if(user.changed('password')) {
          return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
          });
        }
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};