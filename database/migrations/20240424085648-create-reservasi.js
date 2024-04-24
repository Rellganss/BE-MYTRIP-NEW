'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pesawat: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_hotel: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cek_in_hotel: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cek_out_hotel: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      hotel_room: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      seat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_price: {
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
    await queryInterface.dropTable('reservasis');
  }
};