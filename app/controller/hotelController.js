const { hotel } = require('../models');
const apiError = require('../../utils/apiError');

const createHotel = async (req, res, next) => {
  try {
    const { name, city, desc, location, photo, price, facility, cekin, cekout, kategori, room } = req.body;

    const newHotel = await hotel.create({
        hotel_name: name,
        hotel_city: city,
        hotel_desc: desc,
        hotel_alamat: location,
        hotel_foto: photo,
        hotel_harga: price,
        hotel_facility: facility,
        hotel_cekin: cekin,
        hotel_cekout: cekout,
        hotel_kategori: kategori,
        hotel_room: room,
        });

    res.status(200).json({
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
    const hotelById = await hotel.findOne({ where: { id } });

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
    const { name, city, desc, location, photo, price, facility, cekin, cekout, kategori, room } = req.body;

    const updatedHotel = await hotel.update(
      {
        hotel_name: name,
        hotel_city: city,
        hotel_desc: desc,
        hotel_alamat: location,
        hotel_foto: photo,
        hotel_harga: price,
        hotel_facility: facility,
        hotel_cekin: cekin,
        hotel_cekout: cekout,
        hotel_kategori: kategori,
        hotel_room: room,
      },
      { where: { id } }
    );

    res.status(200).json({
      status: 'Update hotel successful',
      data: updatedHotel,
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