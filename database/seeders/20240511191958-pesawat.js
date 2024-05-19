"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pesawats = [
      {
        pesawat_name: "Lion Air",
        pesawat_depature_kota: "Jakarta",
        pesawat_destination_kota: "Bali",
        pesawat_harga: 2000,
        pesawat_foto:
          "https://ik.imagekit.io/vyck38py3/bitebrands%20-%20logo%20pesawat%20maskapai%20penerbangan%20internasional%20dunia%20airlines%2061.jpg?updatedAt=1715533451837",
        pesawat_depature: "2024-05-01 10:00:00",
        pesawat_destination: "2024-05-01 12:00:00",
        id_user: 2,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        pesawat_name: "Continental Airlines",
        pesawat_depature_kota: "New York",
        pesawat_destination_kota: "Los Angeles",
        pesawat_harga: 3000,
        pesawat_foto:
          "https://ik.imagekit.io/vyck38py3/bitebrands%20-%20logo%20pesawat%20maskapai%20penerbangan%20internasional%20dunia%20airlines%2045.jpg?updatedAt=1715533451754",
        pesawat_depature: "2024-05-01 08:00:00",
        pesawat_destination: "2024-05-01 10:00:00",
        id_user: 2,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Pesawats", pesawats);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pesawats", null, {});
  },
};
