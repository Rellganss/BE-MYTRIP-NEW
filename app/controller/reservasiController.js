'use strict';
const { Reservasi, UserTransaksi } = require('../models');
const apiError = require('../../utils/apiError');

const createReservation = async (req, res, next) => {
    try {
        const { id_pesawat, id_hotel, cek_in_hotel, cek_out_hotel, hotel_room, seat, total_price, id_user } = req.body;

        // Buat reservasi baru
        const newReservation = await Reservasi.create({
            id_pesawat,
            id_hotel,
            cek_in_hotel,
            cek_out_hotel,
            hotel_room,
            seat,
            total_price,
        });

        // Buat transaksi pengguna untuk reservasi
        await UserTransaksi.create({
            id_user,
            id_reservasi: newReservation.id, // Gunakan ID reservasi baru
            status: 'pending', // Tentukan status awal
        });

        res.status(201).json({
            status: 'Create reservation successful',
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
            status: 'Get all reservations successful',
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
            return next(new apiError('Reservation not found', 404));
        }

        res.status(200).json({
            status: 'Get reservation by id successful',
            data: reservationById,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

const updateReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_pesawat, id_hotel, cek_in_hotel, cek_out_hotel, hotel_room, seat, total_price } = req.body;

        let reservationById = await Reservasi.findByPk(id);

        if (!reservationById) {
            return next(new apiError('Reservation not found', 404));
        }

        reservationById = await reservationById.update({
            id_pesawat,
            id_hotel,
            cek_in_hotel,
            cek_out_hotel,
            hotel_room,
            seat,
            total_price,
        });

        res.status(200).json({
            status: 'Update reservation successful',
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
            return next(new apiError('Reservation not found', 404));
        }

        await reservationById.destroy();

        res.status(200).json({
            status: 'Delete reservation successful',
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
