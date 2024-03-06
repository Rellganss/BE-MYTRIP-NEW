"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.auth, {
        foreignKey: {
          name: "id_user",
          allowNull: false,
        },
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(["admin", "mitra", "pengguna"]),
        defaultValue: "pengguna",
      },
      no_telp: DataTypes.STRING,
      saldo_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
