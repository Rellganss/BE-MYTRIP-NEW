"use strict";
const {
  Reservasi,
  UserTransaksi,
  Pesawat,
  HotelFacility,
  Hotel,
} = require("../models");
const apiError = require("../../utils/apiError");

const getRandomSeat = () => {
  const rows = "ABCDEFGH";
  const row = rows[Math.floor(Math.random() * rows.length)];
  const number = Math.floor(Math.random() * 30) + 1;
  return `${row}${number}`;
};

const getRandomHotelRoom = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const createReservation = async (req, res, next) => {
  const { id_pesawat, id_hotel_facility, cek_in_hotel, cek_out_hotel } =
    req.body;

  try {
    let total_price = 0;
    let seat;
    let hotel_room;

    if (id_pesawat) {
      const pesawat = await Pesawat.findByPk(id_pesawat);
      if (!pesawat) {
        return next(new apiError("Pesawat not found", 404));
      }
      total_price += pesawat.pesawat_harga;
      seat = req.body.seat || getRandomSeat();
    }

    if (id_hotel_facility) {
      const hotelFacility = await HotelFacility.findByPk(id_hotel_facility);
      if (!hotelFacility) {
        return next(new apiError("Hotel facility not found", 404));
      }
      const hotel = await Hotel.findByPk(hotelFacility.hotelId);
      if (!hotel) {
        return next(new apiError("Hotel not found", 404));
      }
      total_price += hotel.hotel_harga;
      hotel_room = req.body.hotel_room || getRandomHotelRoom();
    }

    const newReservation = await Reservasi.create({
      id_pesawat,
      id_hotel_facility,
      cek_in_hotel,
      cek_out_hotel,
      hotel_room,
      seat,
      total_price,
    });

    await UserTransaksi.create({
      id_user: req.user.id,
      id_reservasi: newReservation.id,
      status: "pending",
    });

    res.status(201).json({
      status: "Create reservation successful",
      data: newReservation,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const allReservations = await Reservasi.findAll();

    res.status(200).json({
      status: "Get all reservations successful",
      data: allReservations,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservationById = await Reservasi.findByPk(id);

    if (!reservationById) {
      return next(new apiError("Reservation not found", 404));
    }

    res.status(200).json({
      status: "Get reservation by id successful",
      data: reservationById,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      id_pesawat,
      id_hotel_facility,
      cek_in_hotel,
      cek_out_hotel,
      hotel_room,
      seat,
      total_price,
    } = req.body;

    let reservationById = await Reservasi.findByPk(id);

    if (!reservationById) {
      return next(new apiError("Reservation not found", 404));
    }

    reservationById = await reservationById.update({
      id_pesawat,
      id_hotel_facility,
      cek_in_hotel,
      cek_out_hotel,
      hotel_room,
      seat,
      total_price,
    });

    res.status(200).json({
      status: "Update reservation successful",
      data: reservationById,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservationById = await Reservasi.findByPk(id);

    if (!reservationById) {
      return next(new apiError("Reservation not found", 404));
    }

    await reservationById.destroy();

    res.status(200).json({
      status: "Delete reservation successful",
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
