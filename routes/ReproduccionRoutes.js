
const express = require('express');
const router = express.Router();

const ReproduccionController = require('../controllers/ReproduccionController');

router.get('/', ReproduccionController.listarReproducciones);
router.get('/:id', ReproduccionController.buscarReproduccion);
router.post('/', ReproduccionController.registrarReproduccion);
router.put('/:id', ReproduccionController.modificarReproduccion);
router.delete('/:id', ReproduccionController.borrarReproduccion);

module.exports = router;
