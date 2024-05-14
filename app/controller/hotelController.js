const { Hotel, Facility, HotelFacility } = require("../models");
const apiError = require("../../utils/apiError");
const path = require("path");
const imagekit = require("../libs/imagekit");

const createHotel = async (req, res, next) => {
  const hotelBody = req.body;
  const file = req.file;
  let hotel_foto;
  try {
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      hotel_foto = uploadImage.url;
    }
    // Membuat hotel baru
    const newHotel = await Hotel.create({
      ...hotelBody,
      hotel_foto,
    });

    // Jika terdapat fasilitas yang dikirimkan, asosiasikan fasilitas dengan hotel
    // if (hotel_facilities && hotel_facilities.length > 0) {
    //   await newHotel.addFacilities(hotel_facilities); // Menambahkan fasilitas ke hotel menggunakan metode addFacilities yang disediakan oleh Sequelize
    // }

    res.status(201).json({
      status: "Create hotel successful",
      data: newHotel,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const addFacility = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newFacility = await Facility.create({
      name: name,
    });

    return res.status(201).json({
      status: "success",
      message: "Facility added successfully",
      data: newFacility,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to add facility",
      error: error.message,
    });
  }
};

const getAllFacility = async (req, res, next) => {
  try {
    const allFacility = await Facility.findAll();

    res.status(200).json({
      status: "Get all facility successful",
      data: allFacility,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const getAllHotel = async (req, res, next) => {
  try {
    const allHotel = await Hotel.findAll();

    res.status(200).json({
      status: "Get all hotel successful",
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
      return next(new apiError("Hotel not found", 404));
    }

    res.status(200).json({
      status: "Get hotel by id successful",
      data: hotelById,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const hotelBody = req.body;
  const file = req.file;
  let hotel_foto;

  let hotelById = await Hotel.findByPk(id);

  if (!hotelById) {
    return next(new apiError("Hotel not found", 404));
  }

  try {
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      hotel_foto = uploadImage.url;
    }
    const updateHotelById = await hotelById.update({
      ...hotelBody,
      hotel_foto,
    });

    // // Jika terdapat fasilitas yang dikirimkan, update asosiasi fasilitas dengan hotel
    // if (hotel_facilities && hotel_facilities.length > 0) {
    //   await hotelById.setFacilities(hotel_facilities); // Mengatur kembali fasilitas untuk hotel menggunakan metode setFacilities yang disediakan oleh Sequelize
    // }

    res.status(200).json({
      status: "Update hotel successful",
      data: updateHotelById,
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
      status: "Delete hotel successful",
      data: deletedHotel,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  createHotel,
  addFacility,
  getAllFacility,
  getAllHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
};
