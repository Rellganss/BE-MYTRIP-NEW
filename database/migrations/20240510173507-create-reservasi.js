'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pesawat: {
        type: Sequelize.INTEGER
      },
      id_hotel: {
        type: Sequelize.INTEGER
      },
      cek_in_hotel: {
        type: Sequelize.DATE
      },
      cek_out_hotel: {
        type: Sequelize.DATE
      },
      hotel_room: {
        type: Sequelize.INTEGER
      },
      seat: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Reservasis');
  }
};