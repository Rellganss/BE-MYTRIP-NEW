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
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};
