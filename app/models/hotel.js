"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hotel.hasOne(models.reservasi, {
        foreignKey: {
          name: "id_hotel",
          allowNull: false,
        },
      });
    }
  }
  hotel.init(
    {
      hotel_name: DataTypes.STRING,
      hotel_city: DataTypes.STRING,
      hotel_desc: DataTypes.STRING,
      hotel_alamat: DataTypes.STRING,
      hotel_foto: DataTypes.STRING,
      hotel_harga: DataTypes.INTEGER,
      hotel_facility: DataTypes.STRING,
      hotel_kategori: {
        type: DataTypes.ENUM(["singelBad", "twinBad", "family"]),
      },
    },
    {
      sequelize,
      modelName: "hotel",
    }
  );
  return hotel;
};
