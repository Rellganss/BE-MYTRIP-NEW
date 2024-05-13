"use strict";

const { User } = require("../../app/models");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
(
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("Users", [
        {
          name: "adminc8",
          no_telp: "+628236576342564",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const adminPassword = process.env.PASSWORD_HASH;
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(adminPassword, saltRounds);

      const user = await User.findAll();

      await queryInterface.bulkInsert("auths", [
        {
          email: "adminc8@mail.com",
          password: hashedPassword,
          id_user: user[0].id,
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Users", null, {});
      await queryInterface.bulkDelete("auths", null, {});
    },
  }
);
