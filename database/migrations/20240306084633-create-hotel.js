'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hotel_name: {
        type: Sequelize.STRING
      },
      hotel_city: {
        type: Sequelize.STRING
      },
      hotel_desc: {
        type: Sequelize.STRING
      },
      hotel_alamat: {
        type: Sequelize.STRING
      },
      hotel_foto: {
        type: Sequelize.STRING
      },
      hotel_harga: {
        type: Sequelize.INTEGER
      },
      hotel_facility: {
        type: Sequelize.STRING
      },
      hotel_cekin: {
        type: Sequelize.DATE
      },
      hotel_cekout: {
        type: Sequelize.DATE
      },
      hotel_kategori: {
        type: Sequelize.ENUM
      },
      hotel_room: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hotels');
  }
};