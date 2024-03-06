"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth.belongsTo(models.user, {
        foreignKey: {
          name: "id_user",
        },
      });
    }
  }
  auth.init(
    {
      id_user: DataTypes.INTEGER,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "auth",
    }
  );
  return auth;
};
