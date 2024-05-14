"use strict";
const { Model, Sequelize } = require("sequelize");
const Auth = require("./auth");
const UserTransaksi = require("./usertransaksi");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Auth, {
        foreignKey: "id_user",
        allowNull: false,
      });
      User.hasMany(models.UserTransaksi, {
        foreignKey: "id_user",
        allowNull: false,
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      role: {
        type: Sequelize.ENUM(["admin", "mitra", "pengguna"]),
        defaultValue: "pengguna",
      },
      no_telp: DataTypes.STRING,
      saldo_user: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          const maxId = await User.max("id");
          user.id = maxId + 1;
        },
      },
    }
  );
  return User;
};
