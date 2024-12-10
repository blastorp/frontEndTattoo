const sql = require('mssql');
const dbConfig = require('../config/db');

// Obtener todas las preguntas frecuentes
const getAllFaqs = async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query('SELECT * FROM preguntas_frecuentes WHERE estado = 1 ORDER BY orden ASC');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas frecuentes', detalle: error.message });
    }
};

// Crear una nueva pregunta frecuente
const createFaq = async (req, res) => {
    const { pregunta, respuesta, categoria, orden } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('pregunta', sql.NVarChar, pregunta)
            .input('respuesta', sql.NVarChar, respuesta)
            .input('categoria', sql.NVarChar, categoria)
            .input('orden', sql.Int, orden)
            .query(`
                INSERT INTO preguntas_frecuentes (pregunta, respuesta, categoria, orden)
                VALUES (@pregunta, @respuesta, @categoria, @orden)
            `);
        res.status(201).json({ message: 'Pregunta frecuente creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la pregunta frecuente', detalle: error.message });
    }
};

// Actualizar una pregunta frecuente
const updateFaq = async (req, res) => {
    const { id } = req.params;
    const { pregunta, respuesta, categoria, estado, orden } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .input('pregunta', sql.NVarChar, pregunta)
            .input('respuesta', sql.NVarChar, respuesta)
            .input('categoria', sql.NVarChar, categoria)
            .input('estado', sql.Bit, estado)
            .input('orden', sql.Int, orden)
            .query(`
                UPDATE preguntas_frecuentes
                SET pregunta = @pregunta, respuesta = @respuesta, categoria = @categoria, estado = @estado, orden = @orden
                WHERE pregunta_id = @id
            `);
        res.status(200).json({ message: 'Pregunta frecuente actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la pregunta frecuente', detalle: error.message });
    }
};

// Eliminar una pregunta frecuente
const deleteFaq = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM preguntas_frecuentes WHERE pregunta_id = @id');
        res.status(200).json({ message: 'Pregunta frecuente eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la pregunta frecuente', detalle: error.message });
    }
};

module.exports = {
    getAllFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
};
