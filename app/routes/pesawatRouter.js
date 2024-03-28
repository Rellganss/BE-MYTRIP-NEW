const router = require("express").Router();
const pesawatController = require('../controller/pesawatController');

// Endpoint untuk membuat pesawat baru
router.post('/tambahpesawat', pesawatController.createPesawat);

// Endpoint untuk mendapatkan semua pesawat
router.get('/totalpesawat', pesawatController.getAllPesawat);

// Endpoint untuk mendapatkan pesawat berdasarkan ID
router.get('/pesawat/:id', pesawatController.getPesawatById);

// Endpoint untuk memperbarui pesawat berdasarkan ID
router.put('/perbaruipesawat/:id', pesawatController.updatePesawat);

// Endpoint untuk menghapus pesawat berdasarkan ID
router.delete('/:id', pesawatController.deletePesawat);

module.exports = router;
