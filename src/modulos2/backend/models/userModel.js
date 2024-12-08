const { connectToDatabase } = require('../config/db');

// Modelo para manejar la tabla de usuarios
const UserModel = {
    // Método para encontrar un usuario por email
    findByEmail: async (email) => {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input('email', email)
                .query('SELECT * FROM Usuarios WHERE email = @email');
            return result.recordset[0]; // Devuelve el primer registro encontrado
        } catch (error) {
            throw new Error('Error al buscar el usuario: ' + error.message);
        }
    },

    // Método para crear un nuevo usuario
    create: async ({ nombre, email, contraseña, tipo_usuario }) => {
        try {
            const pool = await connectToDatabase();
            await pool.request()
                .input('nombre', nombre)
                .input('email', email)
                .input('contraseña', contraseña)
                .input('tipo_usuario', tipo_usuario)
                .input('miembro', false)
                .query(`
                    INSERT INTO Usuarios (nombre, email, contraseña, tipo_usuario, miembro)
                    VALUES (@nombre, @email, @contraseña, @tipo_usuario, @miembro)
                `);
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }
};

module.exports = UserModel;
