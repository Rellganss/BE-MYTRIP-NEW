"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pesawat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pesawat.hasMany(models.Reservasi, {
        foreignKey: "id_pesawat",
        as: "reservasi",
      });
    }
  }
  Pesawat.init(
    {
      pesawat_name: DataTypes.STRING,
      pesawat_depature_kota: DataTypes.STRING,
      pesawat_destination_kota: DataTypes.STRING,
      pesawat_harga: DataTypes.INTEGER,
      pesawat_foto: DataTypes.STRING,
      pesawat_depature: DataTypes.DATE,
      pesawat_destination: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Pesawat",
      hooks: {
        beforeCreate: async (pesawat, options) => {
          const maxId = await Pesawat.max("id");
          pesawat.id = maxId + 1;
        },
      },
    }
  );
  return Pesawat;
};
