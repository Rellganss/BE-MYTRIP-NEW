"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    static associate(models) {
      Facility.belongsToMany(models.Hotel, { through: "HotelFacility" }); // Periksa apakah model Hotel telah diinisialisasi dengan benar
    }
  }
  Facility.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Facility",
      hooks: {
        beforeCreate: async (facility, options) => {
          const maxId = await Facility.max("id");
          facility.id = maxId + 1;
        },
      },
    }
  );
  return Facility;
};
