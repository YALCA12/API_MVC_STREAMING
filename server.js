
const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./config/database');

// Importar las rutas
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const PlanRoutes = require('./routes/PlanRoutes');
const SuscripcionRoutes = require('./routes/SuscripcionRoutes');
const ContenidoRoutes = require('./routes/ContenidoRoutes');
const ReproduccionRoutes = require('./routes/ReproduccionRoutes');
const PagoRoutes = require('./routes/PagoRoutes');

const app = express();

// Configuracion
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('API MVC STREAMING funcionando correctamente');
});

// Registrar las rutas de la API
app.use('/api/usuarios', UsuarioRoutes);
app.use('/api/planes', PlanRoutes);
app.use('/api/suscripciones', SuscripcionRoutes);
app.use('/api/contenidos', ContenidoRoutes);
app.use('/api/reproducciones', ReproduccionRoutes);
app.use('/api/pagos', PagoRoutes);

// Iniciar servidor
const iniciarServidor = async () => {
    await conectarDB();

    app.listen(3000, () => {
        console.log('Servidor ejecutandose en http://localhost:3000');
    });
};

iniciarServidor();
