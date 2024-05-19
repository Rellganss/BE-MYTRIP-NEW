"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserTransaksi extends Model {
    static associate(models) {
      UserTransaksi.belongsTo(models.Reservasi, {
        foreignKey: "id_reservasi",
        as: "reservasi",
      });
      UserTransaksi.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });
    }
  }
  UserTransaksi.init(
    {
      id_user: DataTypes.INTEGER,
      id_reservasi: DataTypes.INTEGER,
      status: {
        type: Sequelize.ENUM(["pending", "success", "cancel"]),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "UserTransaksi",
      hooks: {
        beforeCreate: async (userTransaksi, options) => {
          const maxId = await UserTransaksi.max("id");
          userTransaksi.id = maxId + 1;
        },
      },
    }
  );
  return UserTransaksi;
};
