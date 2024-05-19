"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HotelFacility extends Model {
    static associate(models) {
      HotelFacility.belongsTo(models.Hotel, { foreignKey: "hotelId" });
      HotelFacility.belongsTo(models.Facility, { foreignKey: "facilityId" });
      HotelFacility.hasOne(models.Reservasi, {
        foreignKey: "id_hotel_facility",
        allowNull: false,
      });
      HotelFacility.belongsTo(models.User, {
        foreignKey: "id_user",
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
