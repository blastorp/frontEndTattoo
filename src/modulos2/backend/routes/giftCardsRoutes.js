const express = require('express');
const {
    getAllGiftCards,
    createGiftCard,
    updateGiftCard,
    deleteGiftCard,
} = require('../controllers/giftCardsController');

const router = express.Router();

router.get('/tarjetas', getAllGiftCards);
router.post('/tarjetas', createGiftCard);
router.put('/tarjetas/:id', updateGiftCard);
router.delete('/tarjetas/:id', deleteGiftCard);

module.exports = router;
