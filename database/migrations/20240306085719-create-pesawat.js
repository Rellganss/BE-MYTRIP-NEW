'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesawats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pesawat_name: {
        type: Sequelize.STRING
      },
      pesawat_depature_kota: {
        type: Sequelize.STRING
      },
      pesawat_destination_kota: {
        type: Sequelize.STRING
      },
      pesawat_depature: {
        type: Sequelize.DATE
      },
      pesawat_destination: {
        type: Sequelize.DATE
      },
      pesawat_seat: {
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
    await queryInterface.dropTable('pesawats');
  }
};