"use strict";

const { user } = require("../../app/models");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
(
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("users", [
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

      await user.findAll();

      await queryInterface.bulkInsert("auths", [
        {
          email: "adminc8@mail.com",
          password: hashedPassword,
          id_user: 1,
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users", null, {});
      await queryInterface.bulkDelete("auths", null, {});
    },
  }
);
