const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ofertasRoutes = require('./routes/ofertasRoutes');

// Inicializar la aplicación
const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes desde diferentes orígenes
app.use(bodyParser.json()); // Analizar cuerpos JSON

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/ofertas', ofertasRoutes);

// Configuración del servidor
const PORT = 5000; // Puerto en el que correrá el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
