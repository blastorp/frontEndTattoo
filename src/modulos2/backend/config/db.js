const sql = require('mssql');

// Configuración de la conexión a la base de datos
const dbConfig = {
    user: 'sql15',       // Cambia esto por tu usuario de SQL Server
    password: 'grupoDos02', // Cambia esto por tu contraseña
    server: 'tiusr39pl.cuc-carrera-ti.ac.cr',     // Cambia esto por tu servidor, por ejemplo, localhost o una dirección IP
    database: 'tiusr39pl_PruebaJohnSql15', // Cambia esto por el nombre de tu base de datos
    options: {
        encrypt: true,         // Actívalo si estás utilizando Azure
        trustServerCertificate: true // Solo para entornos de desarrollo
    }
};

// Función para conectarse a la base de datos
const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Conexión a la base de datos exitosa.');
        return pool; // Devuelve el pool para reutilizarlo en consultas
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        throw error; // Lanza el error para manejarlo en otras partes
    }
};

module.exports = {
    sql,
    connectToDatabase,
};
