const AdminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');

// Controlador para registrar un nuevo administrador
const register = async (req, res) => {
    const { nombre, email, contraseña, nivel_acceso, telefono } = req.body;

    if (!nombre || !email || !contraseña || !nivel_acceso) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el email ya existe
        const existingAdmin = await AdminModel.findByEmail(email);
        if (existingAdmin) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear el administrador
        await AdminModel.create({ nombre, email, hash_contraseña: hashedPassword, nivel_acceso, telefono });
        res.status(201).json({ message: 'Administrador registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los administradores
const getAll = async (req, res) => {
    try {
        const admins = await AdminModel.getAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar un administrador
const update = async (req, res) => {
    const { administrador_id } = req.params;
    const { nombre, email, contraseña, nivel_acceso, telefono } = req.body;

    try {
        const hashedPassword = contraseña ? await bcrypt.hash(contraseña, 10) : undefined;
        await AdminModel.update(administrador_id, { nombre, email, hash_contraseña: hashedPassword, nivel_acceso, telefono });
        res.status(200).json({ message: 'Administrador actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un administrador
const remove = async (req, res) => {
    const { administrador_id } = req.params;

    try {
        await AdminModel.delete(administrador_id);
        res.status(200).json({ message: 'Administrador eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, getAll, update, remove };
