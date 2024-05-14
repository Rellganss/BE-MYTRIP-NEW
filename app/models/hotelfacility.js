"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HotelFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HotelFacility.belongsTo(models.Hotel, { foreignKey: "hotelId" });
      HotelFacility.belongsTo(models.Facility, { foreignKey: "facilityId" });
    }
  }
  HotelFacility.init(
    {
      hotelId: DataTypes.INTEGER,
      facilityId: DataTypes.INTEGER,
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
