'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTransaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTransaksi.belongsTo(models.Reservasi, {
        foreignKey: 'id_reservasi',
      });
      UserTransaksi.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
    }
  }
  UserTransaksi.init({
    id_user: DataTypes.INTEGER,
    id_reservasi: DataTypes.INTEGER,
    status: {
      type: Sequelize.ENUM(["pending", "success", "cancel"]),
      defaultValue: "pending"
    }
  }, {
    sequelize,
    modelName: 'UserTransaksi',
  });
  return UserTransaksi;
};