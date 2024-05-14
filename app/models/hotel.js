"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hotel.belongsToMany(models.Facility, { through: "HotelFacility" });
    }
  }
  Hotel.init(
    {
      hotel_name: DataTypes.STRING,
      hotel_city: DataTypes.STRING,
      hotel_desc: DataTypes.STRING,
      hotel_alamat: DataTypes.STRING,
      hotel_foto: DataTypes.STRING,
      hotel_harga: DataTypes.INTEGER,
      hotel_kategori: {
        type: DataTypes.ENUM(["singleBed", "twinBed", "family"]),
      },
    },
    {
      sequelize,
      modelName: "Hotel",
      hooks: {
        beforeCreate: async (hotel, options) => {
          const maxId = await Hotel.max("id");
          hotel.id = maxId + 1;
        },
      },
    }
  );
  return Hotel;
};
