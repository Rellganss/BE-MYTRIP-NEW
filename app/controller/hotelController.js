const { hotel } = require('../models'); // Correct import statement
const apiError = require('../../utils/apiError');

const createHotel = async (req, res, next) => {
    try {
        const { hotel_name, hotel_city, hotel_desc, hotel_alamat, hotel_foto, hotel_harga, hotel_facility, hotel_kategori } = req.body;

        const newHotel = await hotel.create({
            hotel_name,
            hotel_city,
            hotel_desc,
            hotel_alamat,
            hotel_foto,
            hotel_harga,
            hotel_facility,
            hotel_kategori,
        });

        res.status(201).json({
            status: 'Create hotel successful',
            data: newHotel,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

const getAllHotel = async (req, res, next) => {
    try {
        const allHotel = await hotel.findAll();

        res.status(200).json({
            status: 'Get all hotel successful',
            data: allHotel,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

const getHotelById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const hotelById = await hotel.findByPk(id);

        if (!hotelById) {
            return next(new apiError('Hotel not found', 404));
        }

        res.status(200).json({
            status: 'Get hotel by id successful',
            data: hotelById,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

const updateHotel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { hotel_name, hotel_city, hotel_desc, hotel_alamat, hotel_foto, hotel_harga, hotel_facility, hotel_kategori } = req.body;

        let hotelById = await hotel.findByPk(id);

        if (!hotelById) {
            return next(new apiError('Hotel not found', 404));
        }

        hotelById = await hotelById.update({
            hotel_name,
            hotel_city,
            hotel_desc,
            hotel_alamat,
            hotel_foto,
            hotel_harga,
            hotel_facility,
            hotel_kategori,
        });

        res.status(200).json({
            status: 'Update hotel successful',
            data: hotelById,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

const deleteHotel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedHotel = await hotel.destroy({ where: { id } });

        res.status(200).json({
            status: 'Delete hotel successful',
            data: deletedHotel,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

module.exports = {
    createHotel,
    getAllHotel,
    getHotelById,
    updateHotel,
    deleteHotel,
};
