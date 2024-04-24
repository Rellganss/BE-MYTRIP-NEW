"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_transaksi.belongsTo(models.reservasi, {
        foreignKey: {
          name: "id_reservasi",
        },
      });
      user_transaksi.belongsTo(models.user, {
        foreignKey: {
          name: "id_user",
        },
      });
    }
  }
  user_transaksi.init(
    {
      id_user: DataTypes.INTEGER,
      id_reservasi: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM(["pending", "success", "cancel"]),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "user_transaksi",
    }
  );
  return user_transaksi;
};
