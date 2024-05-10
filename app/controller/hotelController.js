const { Hotel, Facility, HotelFacility } = require('../models'); // Mengimpor model Hotel, Facility, dan HotelFacility
const apiError = require('../../utils/apiError');

const createHotel = async (req, res, next) => {
    try {
        const { hotel_name, hotel_city, hotel_desc, hotel_alamat, hotel_foto, hotel_harga, hotel_kategori, hotel_facilities } = req.body; // Menyesuaikan nama field yang diterima dengan struktur data

        // Membuat hotel baru
        const newHotel = await Hotel.create({
            hotel_name,
            hotel_city,
            hotel_desc,
            hotel_alamat,
            hotel_foto,
            hotel_harga,
            hotel_kategori,
        });

        // Jika terdapat fasilitas yang dikirimkan, asosiasikan fasilitas dengan hotel
        if (hotel_facilities && hotel_facilities.length > 0) {
            await newHotel.addFacilities(hotel_facilities); // Menambahkan fasilitas ke hotel menggunakan metode addFacilities yang disediakan oleh Sequelize
        }

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
        const allHotel = await Hotel.findAll();

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
        const hotelById = await Hotel.findByPk(id);

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
        const { hotel_name, hotel_city, hotel_desc, hotel_alamat, hotel_foto, hotel_harga, hotel_kategori, hotel_facilities } = req.body;

        let hotelById = await Hotel.findByPk(id);

        if (!hotelById) {
            return next(new apiError('Hotel not found', 404));
        }

        // Update data hotel
        hotelById = await hotelById.update({
            hotel_name,
            hotel_city,
            hotel_desc,
            hotel_alamat,
            hotel_foto,
            hotel_harga,
            hotel_kategori,
        });

        // Jika terdapat fasilitas yang dikirimkan, update asosiasi fasilitas dengan hotel
        if (hotel_facilities && hotel_facilities.length > 0) {
            await hotelById.setFacilities(hotel_facilities); // Mengatur kembali fasilitas untuk hotel menggunakan metode setFacilities yang disediakan oleh Sequelize
        }

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
        const deletedHotel = await Hotel.destroy({ where: { id } });

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
