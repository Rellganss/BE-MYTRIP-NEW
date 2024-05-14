'use strict';

const { User } = require("../../app/models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hotels = [
      {
        hotel_name: "Atsara Hotel Balikpapan",
        hotel_city: "Balikpapan",
        hotel_desc: "Located in Balikpapan, 15 km from Batakan Stadium, Astara Hotel Balikpapan provides accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden. The accommodation features a range of water sports facilities, as well as a shared lounge and a bar. The accommodation offers a 24-hour front desk, airport transfers, a kids' club and free WiFi throughout the property.",
        hotel_alamat: "Komp. BSB Balikpapan Superblock, Jl. Jenderal Sudirman No.47, Gn. Bahagia, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur, 76114 Balikpapan, Indonesia ",
        hotel_foto: "https://ik.imagekit.io/vyck38py3/Astara.jpg?updatedAt=1715697306686",
        hotel_harga: 200,
        hotel_kategori: "singleBed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotel_name: "Novotel Balikpapan",
        hotel_city: "Balikpapan",
        hotel_desc: "Strategically located a 5-minute drive from Balikpapan Trade Center, Novotel Balikpapan offers an outdoor pool and 24-hour front desk. Free WiFi access is available in all areas. Decorated with warm colours, the air conditioned rooms here are fitted with flat-screen cable TV, safety deposit box and desk. An electric kettle and minibar are provided. En suite bathroom comes with a shower, hairdryer and free toiletries. The rooms have either a city or a sea view.",
        hotel_alamat: "Jl. Brigjen Ery Suparjan No. 2, 76112 Balikpapan, Indonesia",
        hotel_foto: "https://ik.imagekit.io/vyck38py3/Novotel.jpg?updatedAt=1715697306666",
        hotel_harga: 300,
        hotel_kategori: "family",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    const facilities = [
      {
        name: "Free Wifi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "View",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Hotels", hotels);
    await queryInterface.bulkInsert("Facilities", facilities);

    // Fetching hotelIds and facilityIds
    const [hotelIds, facilityIds] = await Promise.all([
      queryInterface.sequelize.query("SELECT id FROM Hotels;"),
      queryInterface.sequelize.query("SELECT id FROM Facilities;")
    ]);

    // Mapping hotelIds and facilityIds
    const hotelIdMap = hotelIds[0].map(hotel => hotel.id);
    const facilityIdMap = facilityIds[0].map(facility => facility.id);

    const hotelFacilities = [
      {
        hotelId: hotelIdMap[0],
        facilityId: facilityIdMap[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hotelId: hotelIdMap[1],
        facilityId: facilityIdMap[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("HotelFacilities", hotelFacilities);
  },

  async down(queryInterface, Sequelize) {
    // Deleting data from the junction table first to maintain referential integrity
    await queryInterface.bulkDelete("HotelFacilities", null, {});
    await queryInterface.bulkDelete("Hotels", null, {});
    await queryInterface.bulkDelete("Facilities", null, {});
  },
};
