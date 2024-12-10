const sql = require('mssql');
const dbConfig = require('../config/db'); // Archivo para la configuración de la conexión

// Obtener todas las tarjetas de regalo
const getAllGiftCards = async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM tarjetas_regalo');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tarjetas de regalo', detalle: error.message });
    }
};

// Crear una nueva tarjeta de regalo
const createGiftCard = async (req, res) => {
    const { codigo, valor, fecha_expiracion, cliente_id } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('codigo', sql.NVarChar, codigo)
            .input('valor', sql.Decimal(10, 2), valor)
            .input('fecha_expiracion', sql.Date, fecha_expiracion)
            .input('cliente_id', sql.Int, cliente_id)
            .query(`
                INSERT INTO tarjetas_regalo (codigo, valor, fecha_expiracion, cliente_id)
                VALUES (@codigo, @valor, @fecha_expiracion, @cliente_id)
            `);
        res.status(201).json({ message: 'Tarjeta de regalo creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarjeta de regalo', detalle: error.message });
    }
};

// Actualizar una tarjeta de regalo
const updateGiftCard = async (req, res) => {
    const { id } = req.params;
    const { codigo, valor, fecha_expiracion, estado, cliente_id } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .input('codigo', sql.NVarChar, codigo)
            .input('valor', sql.Decimal(10, 2), valor)
            .input('fecha_expiracion', sql.Date, fecha_expiracion)
            .input('estado', sql.Bit, estado)
            .input('cliente_id', sql.Int, cliente_id)
            .query(`
                UPDATE tarjetas_regalo
                SET codigo = @codigo, valor = @valor, fecha_expiracion = @fecha_expiracion, estado = @estado, cliente_id = @cliente_id
                WHERE tarjeta_id = @id
            `);
        res.status(200).json({ message: 'Tarjeta de regalo actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarjeta de regalo', detalle: error.message });
    }
};

// Eliminar una tarjeta de regalo
const deleteGiftCard = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM tarjetas_regalo WHERE tarjeta_id = @id');
        res.status(200).json({ message: 'Tarjeta de regalo eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarjeta de regalo', detalle: error.message });
    }
};

module.exports = {
    getAllGiftCards,
    createGiftCard,
    updateGiftCard,
    deleteGiftCard,
};
