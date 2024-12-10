const { connectToDatabase } = require('../config/db');

// Modelo para manejar la tabla de administradores
const AdminModel = {
    findByEmail: async (email) => {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input('email', email)
                .query('SELECT * FROM administradores WHERE email = @email');
            return result.recordset[0];
        } catch (error) {
            throw new Error('Error al buscar el administrador: ' + error.message);
        }
    },

    create: async ({ nombre, email, hash_contraseña, nivel_acceso, telefono }) => {
        try {
            const pool = await connectToDatabase();
            await pool.request()
                .input('nombre', nombre)
                .input('email', email)
                .input('hash_contraseña', hash_contraseña)
                .input('nivel_acceso', nivel_acceso)
                .input('telefono', telefono)
                .query(`
                    INSERT INTO administradores (nombre, email, hash_contraseña, nivel_acceso, telefono)
                    VALUES (@nombre, @email, @hash_contraseña, @nivel_acceso, @telefono)
                `);
        } catch (error) {
            throw new Error('Error al crear el administrador: ' + error.message);
        }
    },

    getAll: async () => {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .query('SELECT * FROM administradores');
            return result.recordset;
        } catch (error) {
            throw new Error('Error al obtener los administradores: ' + error.message);
        }
    },

    update: async (administrador_id, { nombre, email, hash_contraseña, nivel_acceso, telefono }) => {
        try {
            const pool = await connectToDatabase();
            await pool.request()
                .input('administrador_id', administrador_id)
                .input('nombre', nombre)
                .input('email', email)
                .input('hash_contraseña', hash_contraseña)
                .input('nivel_acceso', nivel_acceso)
                .input('telefono', telefono)
                .query(`
                    UPDATE administradores
                    SET nombre = @nombre, email = @email, hash_contraseña = @hash_contraseña,
                        nivel_acceso = @nivel_acceso, telefono = @telefono
                    WHERE administrador_id = @administrador_id
                `);
        } catch (error) {
            throw new Error('Error al actualizar el administrador: ' + error.message);
        }
    },

    delete: async (administrador_id) => {
        try {
            const pool = await connectToDatabase();
            await pool.request()
                .input('administrador_id', administrador_id)
                .query('DELETE FROM administradores WHERE administrador_id = @administrador_id');
        } catch (error) {
            throw new Error('Error al eliminar el administrador: ' + error.message);
        }
    }
};

module.exports = AdminModel;
