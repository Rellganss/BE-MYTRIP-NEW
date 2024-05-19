"use strict";
const { Model } = require("sequelize");
const User = require("./user"); // Pastikan impor model user dilakukan dengan benar

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {
      Auth.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
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
      hooks: {
        beforeCreate: async (auth, options) => {
          const maxId = await Auth.max("id");
          auth.id = maxId + 1;
        },
      },
    }
  );
  return Auth;
};
