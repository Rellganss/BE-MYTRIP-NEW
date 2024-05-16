const { Pesawat } = require("../models");
const apiError = require("../../utils/apiError");
const path = require("path");
const imagekit = require("../libs/imagekit");

const createPesawat = async (req, res, next) => {
  const pesawatBody = req.body;
  const file = req.file;
  let pesawat_foto;
  try {
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      pesawat_foto = uploadImage.url;
    }
    const newPesawat = await Pesawat.create({
      ...pesawatBody,
      pesawat_foto,
    });

    res.status(201).json({
      status: "Create pesawat successful",
      data: newPesawat,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const getAllPesawat = async (req, res, next) => {
  try {
    const allPesawat = await Pesawat.findAll();

    res.status(200).json({
      status: "Get all pesawat successful",
      data: allPesawat,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const getPesawatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pesawatById = await Pesawat.findByPk(id);

    if (!pesawatById) {
      return next(new apiError("Pesawat not found", 404));
    }

    res.status(200).json({
      status: "Get pesawat by id successful",
      data: pesawatById,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const updatePesawat = async (req, res, next) => {
  const { id } = req.params;
  const pesawatBody = req.body;
  const file = req.file;
  let pesawat_foto;

  let pesawatById = await Pesawat.findByPk(id);

  if (!pesawatById) {
    return next(new apiError("Pesawat not found", 404));
  }
  try {
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      pesawat_foto = uploadImage.url;
    }

    const updatePesawat = await pesawatById.update({
      ...pesawatBody,
      pesawat_foto,
    });

    res.status(200).json({
      status: "Update pesawat successful",
      data: updatePesawat,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const deletePesawat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pesawatById = await Pesawat.findByPk(id);

    if (!pesawatById) {
      return next(new apiError("Pesawat not found", 404));
    }

    await pesawatById.destroy();

    res.status(200).json({
      status: "Delete pesawat successful",
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const getAllPesawatByUserId = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const pesawatByUser = await Pesawat.findAll({
      where: { id_user },
    });

    if (pesawatByUser.length === 0) {
      return next(new apiError("No pesawat found for this user", 404));
    }

    res.status(200).json({
      status: "Get all pesawat by user id successful",
      data: pesawatByUser,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  createPesawat,
  getAllPesawat,
  getPesawatById,
  updatePesawat,
  deletePesawat,
  getAllPesawatByUserId,
};
