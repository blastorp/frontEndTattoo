const express = require('express');
const router = express.Router();
const { Administrador } = require('../models/userModel'); // Asegúrate de importar tu modelo

// Obtener todos los administradores
router.get('/', async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener administradores' });
  }
});

// Crear un nuevo administrador
router.post('/', async (req, res) => {
  const { nombre, email, hash_contraseña, nivel_acceso, telefono } = req.body;
  try {
    const nuevoAdmin = await Administrador.create({ nombre, email, hash_contraseña, nivel_acceso, telefono });
    res.status(201).json(nuevoAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear administrador' });
  }
});

// Actualizar un administrador
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, hash_contraseña, nivel_acceso, telefono } = req.body;
  try {
    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado' });
    await admin.update({ nombre, email, hash_contraseña, nivel_acceso, telefono });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar administrador' });
  }
});

// Eliminar un administrador
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado' });
    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar administrador' });
  }
});

module.exports = router;
