
const express = require('express');
const router = express.Router();

const SuscripcionController = require('../controllers/SuscripcionController');

router.get('/', SuscripcionController.listarSuscripciones);
router.get('/:id', SuscripcionController.buscarSuscripcion);
router.post('/', SuscripcionController.registrarSuscripcion);
router.put('/:id', SuscripcionController.modificarSuscripcion);
router.delete('/:id', SuscripcionController.borrarSuscripcion);

module.exports = router;
