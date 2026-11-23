
const express = require('express');
const router = express.Router();

const PagoController = require('../controllers/PagoController');

router.get('/', PagoController.listarPagos);
router.get('/:id', PagoController.buscarPago);
router.post('/', PagoController.registrarPago);
router.put('/:id', PagoController.modificarPago);
router.delete('/:id', PagoController.borrarPago);

module.exports = router;
