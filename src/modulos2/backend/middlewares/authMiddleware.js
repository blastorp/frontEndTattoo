const jwt = require('jsonwebtoken');

// Clave secreta para JWT (debe ser la misma que se usa en authRoutes.js)
const JWT_SECRET = 'ProyectoTattoAPSW1'; // Cambia esto por algo más seguro

// Middleware para verificar el token JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Se requiere autenticación' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Almacenar el ID del usuario en la solicitud para usarlo en las rutas protegidas
        req.userId = decoded.id;
        req.tipo_usuario = decoded.tipo_usuario; // Almacena el tipo de usuario también
        next();
    });
};

module.exports = authMiddleware;
