const router = require('express').Router();
const hotelController = require('../controller/hotelController');

router.post('/tambahhotel', hotelController.createHotel);
router.get('/totalhotel', hotelController.getAllHotel);
router.get('/hotel/:id', hotelController.getHotelById);
router.put('/perbaruihotel/:id', hotelController.updateHotel);  
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;