const express = require('express');
const {
    obtenerOfertas,
    crearOferta,
    actualizarOferta,
    eliminarOferta,
} = require('../controllers/ofertasController');

const router = express.Router();

router.get('/', obtenerOfertas);
router.post('/', crearOferta);
router.put('/:id', actualizarOferta);
router.delete('/:id', eliminarOferta);

module.exports = router;
