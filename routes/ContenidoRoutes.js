
const express = require('express');
const router = express.Router();

const ContenidoController = require('../controllers/ContenidoController');

router.get('/', ContenidoController.listarContenidos);
router.get('/:id', ContenidoController.buscarContenido);
router.post('/', ContenidoController.registrarContenido);
router.put('/:id', ContenidoController.modificarContenido);
router.delete('/:id', ContenidoController.borrarContenido);

module.exports = router;
