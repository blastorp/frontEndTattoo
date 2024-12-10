const express = require('express');
const {
    getAllFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
} = require('../controllers/faqController');

const router = express.Router();

router.get('/faqs', getAllFaqs);
router.post('/faqs', createFaq);
router.put('/faqs/:id', updateFaq);
router.delete('/faqs/:id', deleteFaq);

module.exports = router;
