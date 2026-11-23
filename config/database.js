
const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const config = {
    connectionString:
        'Driver={ODBC Driver 18 for SQL Server};' +
        'Server=localhost;' +
        'Database=DB_STREAMING;' +
        'Trusted_Connection=Yes;' +
        'TrustServerCertificate=Yes;'
};

const conectarDB = async () => {
    try {
        await sql.connect(config);
        console.log('Conexion exitosa con SQL Server');
    } catch (error) {
        console.log('Error al conectar con SQL Server:', error.message);
    }
};

module.exports = {
    sql,
    conectarDB
};
