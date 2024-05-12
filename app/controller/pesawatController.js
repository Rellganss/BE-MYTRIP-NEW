const { Pesawat } = require('../models');
const apiError = require('../../utils/apiError')

const createPesawat = async (req, res, next) => {
    try {
        const { pesawat_name, pesawat_depature_kota, pesawat_destination_kota, pesawat_harga, pesawat_foto, pesawat_depature, pesawat_destination } = req.body;

        const newPesawat = await Pesawat.create({
            pesawat_name,
            pesawat_depature_kota,
            pesawat_destination_kota,
            pesawat_harga,
            pesawat_foto,
            pesawat_depature,
            pesawat_destination,
        });

        res.status(201).json({
            status: 'Create pesawat successful',
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
            status: 'Get all pesawat successful',
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
            return next(new apiError('Pesawat not found', 404));
        }

        res.status(200).json({
            status: 'Get pesawat by id successful',
            data: pesawatById,
        });
    } catch (err) {
        next(new apiError(err.message, 500));
    }
};

const updatePesawat = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { pesawat_name, pesawat_depature_kota, pesawat_destination_kota, pesawat_harga, pesawat_foto, pesawat_depature, pesawat_destination } = req.body;

        let pesawatById = await Pesawat.findByPk(id);

        if (!pesawatById) {
            return next(new apiError('Pesawat not found', 404));
        }

        pesawatById = await pesawatById.update({
            pesawat_name,
            pesawat_depature_kota,
            pesawat_destination_kota,
            pesawat_harga,
            pesawat_foto,
            pesawat_depature,
            pesawat_destination,
        });

        res.status(200).json({
            status: 'Update pesawat successful',
            data: pesawatById,
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
            return next(new apiError('Pesawat not found', 404));
        }

        await pesawatById.destroy();

        res.status(200).json({
            status: 'Delete pesawat successful',
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
};