const sql = require('mssql');
const dbConfig = require('../config/db');

// Obtener todas las ofertas
const obtenerOfertas = async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM ofertas_promociones');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ofertas.' });
    }
};

// Crear una nueva oferta
const crearOferta = async (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, descuento } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('descuento', sql.Decimal(5, 2), descuento)
            .query(`
                INSERT INTO ofertas_promociones (nombre, descripcion, fecha_inicio, fecha_fin, descuento)
                VALUES (@nombre, @descripcion, @fecha_inicio, @fecha_fin, @descuento);
                SELECT SCOPE_IDENTITY() AS oferta_id;
            `);
        res.status(201).json({ oferta_id: result.recordset[0].oferta_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la oferta.' });
    }
};

// Actualizar una oferta
const actualizarOferta = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, descuento, estado } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('descuento', sql.Decimal(5, 2), descuento)
            .input('estado', sql.Bit, estado)
            .query(`
                UPDATE ofertas_promociones
                SET nombre = @nombre,
                    descripcion = @descripcion,
                    fecha_inicio = @fecha_inicio,
                    fecha_fin = @fecha_fin,
                    descuento = @descuento,
                    estado = @estado
                WHERE oferta_id = @id;
            `);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Oferta no encontrada.' });
        }
        res.status(200).json({ message: 'Oferta actualizada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la oferta.' });
    }
};

// Eliminar una oferta
const eliminarOferta = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM ofertas_promociones WHERE oferta_id = @id;');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Oferta no encontrada.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la oferta.' });
    }
};

module.exports = {
    obtenerOfertas,
    crearOferta,
    actualizarOferta,
    eliminarOferta,
};
