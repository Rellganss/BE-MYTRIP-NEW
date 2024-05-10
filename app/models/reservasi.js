'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservasi.belongsTo(models.Pesawat, {
        foreignKey: 'id_pesawat',
        as: 'pesawat',
      });
      Reservasi.belongsTo(models.Hotel, {
        foreignKey: 'id_hotel',
        as: 'hotel',
      });
      Reservasi.hasOne(models.UserTransaksi, {
        foreignKey: 'id_reservasi',
        as: 'user_transaksi',
      });
      
    }
  }
  Reservasi.init({
    id_pesawat: DataTypes.INTEGER,
    id_hotel: DataTypes.INTEGER,
    cek_in_hotel: DataTypes.DATE,
    cek_out_hotel: DataTypes.DATE,
    hotel_room: DataTypes.INTEGER,
    seat: DataTypes.STRING,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservasi',
  });
  return Reservasi;
};