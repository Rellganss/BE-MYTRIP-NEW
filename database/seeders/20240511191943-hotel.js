"use strict";

const { User } = require("../../app/models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hotels = [
      {
        hotel_city: "",
        hotel_desc: "",
        hotel_alamat: "",
        hotel_foto: "",
        hotel_harga: 0,
        hotel_kategori: "",
        updatedAt: "2022-11-28T06:25:24.446Z",
        createdAt: "2022-11-28T06:25:24.446Z",
      },
      {
        hotel_city: "",
        hotel_desc: "",
        hotel_alamat: "",
        hotel_foto: "",
        hotel_harga: 0,
        hotel_kategori: "",
        updatedAt: "2022-11-28T06:25:24.446Z",
        createdAt: "2022-11-28T06:25:24.446Z",
      },
    ];
    const facilities = [
      {
        name: "",
      },
      {
        name: "",
      },
    ];
    const hotelFacilities = [
      {
        id_hotel: 1,
        id_facility: 1,
      },
      {
        id_hotel: 2,
        id_facility: 2,
      },
    ];
    await queryInterface.bulkInsert("Hotels", hotels);
    await queryInterface.bulkInsert("Facilities", facilities);
    await queryInterface.bulkInsert("HotelFacilities", hotelFacilities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Hotels", null, {});
    await queryInterface.bulkDelete("Facilities", null, {});
    await queryInterface.bulkDelete("HotelFacilities", null, {});
  },
};
