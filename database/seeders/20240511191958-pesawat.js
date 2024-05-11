"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pesawats = [
      {
        pesawat_name: "",
        pesawat_depature_kota: "",
        pesawat_destination_kota: "",
        pesawat_depature: "",
        pesawat_destination: "",
        updatedAt: "2022-11-28T06:25:24.446Z",
        createdAt: "2022-11-28T06:25:24.446Z",
      },
      {
        pesawat_name: "",
        pesawat_depature_kota: "",
        pesawat_destination_kota: "",
        pesawat_depature: "",
        pesawat_destination: "",
        updatedAt: "2022-11-28T06:25:24.446Z",
        createdAt: "2022-11-28T06:25:24.446Z",
      },
    ];
    await queryInterface.bulkInsert("Pesawats", pesawats);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pesawats", null, {});
  },
};
