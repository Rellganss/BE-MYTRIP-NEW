"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pesawat extends Model {
    static associate(models) {
      Pesawat.hasMany(models.Reservasi, {
        foreignKey: "id_pesawat",
        as: "reservasi",
      });
      Pesawat.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
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
      id_user: DataTypes.INTEGER,
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
