const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Clave secreta para JWT
const JWT_SECRET = 'ProyectoTattoAPSW1'; // Cambia esto por algo más seguro

// Ejemplo de ruta protegida (opcional)
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Acceso autorizado', userId: req.userId, tipo_usuario: req.tipo_usuario });
});

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { nombre, email, contraseña, tipo_usuario } = req.body;

    if (!nombre || !email || !contraseña || !tipo_usuario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el email ya existe
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear el usuario
        await UserModel.create({ nombre, email, contraseña: hashedPassword, tipo_usuario });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario existe
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar las contraseñas
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.IdUsuario, tipo_usuario: user.tipo_usuario },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
