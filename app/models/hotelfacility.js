"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HotelFacility extends Model {
    static associate(models) {
      HotelFacility.belongsTo(models.Hotel, {
        foreignKey: "hotelId",
        as: "hotel",
      });
      HotelFacility.belongsTo(models.Facility, {
        foreignKey: "facilityId",
        as: "facility",
      });
      HotelFacility.hasOne(models.Reservasi, {
        foreignKey: "id_hotel_facility",
        as: "reservasi",
      });
      HotelFacility.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });
    }
  }
  HotelFacility.init(
    {
      hotelId: DataTypes.INTEGER,
      facilityId: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HotelFacility",
      hooks: {
        beforeCreate: async (hotelFacility, options) => {
          const maxId = await HotelFacility.max("id");
          hotelFacility.id = maxId + 1;
        },
      },
    }
  );
  return HotelFacility;
};
