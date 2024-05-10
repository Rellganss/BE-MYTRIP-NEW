"use strict";
const { Model } = require("sequelize");
const User = require("./user"); // Pastikan impor model user dilakukan dengan benar

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {
      Auth.belongsTo(models.User, { // Ganti 'user' dengan 'User'
        foreignKey: "id_user",
      });
    }
  }
  Auth.init(
    {
      id_user: DataTypes.INTEGER,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Auth",
    }
  );
  return Auth;
};
