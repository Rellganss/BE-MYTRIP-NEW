"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Auth, {
        foreignKey: "id_user",
        as: "auth",
        allowNull: false,
      });
      User.hasMany(models.UserTransaksi, {
        foreignKey: "id_user",
        as: "userTransaksi",
        allowNull: false,
      });
      User.hasMany(models.Pesawat, {
        foreignKey: "id_user",
        as: "pesawat",
        allowNull: false,
      });
      User.hasMany(models.HotelFacility, {
        foreignKey: "id_user",
        as: "hotelFacility",
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
