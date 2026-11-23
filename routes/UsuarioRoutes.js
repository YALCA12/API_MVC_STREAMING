
const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

// Rutas de usuarios
router.get('/', UsuarioController.listarUsuarios);

router.get('/:id', UsuarioController.buscarUsuario);

router.post('/', UsuarioController.registrarUsuario);

router.put('/:id', UsuarioController.modificarUsuario);

router.delete('/:id', UsuarioController.borrarUsuario);

module.exports = router;
