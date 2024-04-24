"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reservasi.belongsTo(models.pesawat, {
        foreignKey: {
          name: "id_pesawat",
        },
      });
      reservasi.belongsTo(models.hotel, {
        foreignKey: {
          name: "id_hotel",
        },
      });
      reservasi.hasOne(models.user_transaksi, {
        foreignKey: {
          name: "id_reservasi",
          allowNull: false,
        },
      });
    }
  }
  reservasi.init(
    {
      id_pesawat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_hotel: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cek_in_hotel: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cek_out_hotel: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      hotel_room: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      seat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reservasi",
    }
  );
  return reservasi;
};
