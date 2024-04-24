"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pesawat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pesawat.hasOne(models.reservasi, {
        foreignKey: {
          name: "id_pesawat",
          allowNull: false,
        },
      });
    }
  }
  pesawat.init(
    {
      pesawat_name: DataTypes.STRING,
      pesawat_depature_kota: DataTypes.STRING,
      pesawat_destination_kota: DataTypes.STRING,
      pesawat_depature: DataTypes.DATE,
      pesawat_destination: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "pesawat",
    }
  );
  return pesawat;
};
