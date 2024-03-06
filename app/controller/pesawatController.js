const { Pesawat } = require('../models')
const apiError = require('../../utils/apiError')

const createPesawat = async (req, res, next) => {
    try {
        const { name, depature_city, destination_city, image, depature, destination, seat } = req.body
    
        const newPesawat = await Pesawat.create({
            pesawat_name: name,
            pesawat_depature_kota: depature_city,
            pesawat_destination_kota: destination_city,
            pesawat_image: image,
            pesawat_depature: depature,
            pesawat_destination: destination,
            pesawat_seat: seat,
        })
    
        res.status(200).json({
        status: 'Create pesawat successful',
        data: newPesawat,
        })
    } catch (err) {
        next(new apiError(err.message, 500))
    }
}

const getAllPesawat = async (req, res, next) => {
    try {
        const allPesawat = await Pesawat.findAll()
    
        res.status(200).json({
        status: 'Get all pesawat successful',
        data: allPesawat,
        })
    } catch (err) {
        next(new apiError(err.message, 500))
    }
}

const getPesawatById = async (req, res, next) => {
    try {
        const { id } = req.params
        const pesawatById = await Pesawat.findOne({ where: { id } })
    
        res.status(200).json({
        status: 'Get pesawat by id successful',
        data: pesawatById,
        })
    } catch (err) {
        next(new apiError(err.message, 500))
    }
}

const updatePesawat = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, depature_city, destination_city, image, depature, destination, seat } = req.body
    
        const pesawatById = await Pesawat.findOne({ where: { id } })
    
        if (!pesawatById) {
        return next(new apiError('Pesawat not found', 404))
        }
    
        const updatedPesawat = await pesawatById.update({
        pesawat_name: name,
        pesawat_depature_kota: depature_city,
        pesawat_destination_kota: destination_city,
        pesawat_image: image,
        pesawat_depature: depature,
        pesawat_destination: destination,
        pesawat_seat: seat,
        })
    
        res.status(200).json({
        status: 'Update pesawat successful',
        data: updatedPesawat,
        })
    } catch (err) {
        next(new apiError(err.message, 500))
    }
}

const deletePesawat = async (req, res, next) => {
    try {
        const { id } = req.params
    
        const pesawatById = await Pesawat.findOne({ where: { id } })
    
        if (!pesawatById) {
        return next(new apiError('Pesawat not found', 404))
        }
    
        await pesawatById.destroy()
    
        res.status(200).json({
        status: 'Delete pesawat successful',
        })
    } catch (err) {
        next(new apiError(err.message, 500))
    }
}

module.exports = {
    createPesawat,
    getAllPesawat,
    getPesawatById,
    updatePesawat,
    deletePesawat,
}