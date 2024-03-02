const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    constructor(config) {
        this.config = config;
        this.pool = mysql.createPool(config);

        process.on('SIGINT', () => {
            this.closePool();
            process.exit();
        });

        this.setupReconnection();
    }

    async connect() {
        try {
            const connection = await this.pool.getConnection();
            console.log('Успешное подключение к базе данных');
            return connection;
        } catch (err) {
            console.error('Ошибка при подключении к базе данных:', err);
            throw err;
        }
    }

    async query(sql) {
        const connection = await this.connect();
        
        try {
            const [results] = await connection.query(sql);
            return results;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            throw err;
        } finally {
            connection.release();
        }
    }

    async checkConnection() {
        try {
            const connection = await this.connect();
            await connection.ping();
            connection.release();
        } catch (error) {
            console.error('Ошибка при проверке соединения:', error);
            console.log('Повторное подключение к базе данных');
        }
    }

    insert(table, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => (typeof value === 'string' ? `'${value}'` : value)).join(', ');

        const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

        return this.query(sql);
    }

    select(table, columns = '*', condition = '') {
        const sql = `SELECT ${columns} FROM ${table} ${condition}`;
        return this.query(sql);
    }

    delete(table, condition = '') {
        const sql = `DELETE FROM ${table} ${condition}`;
        return this.query(sql);
    }

    async closePool() {
        await this.pool.end();
        console.log('Пул соединений закрыт');
    }

    setupReconnection() {
        setInterval(async () => {
            await this.checkConnection();
        }, 24 * 60 * 60 * 1000);
    }
}

const sharedDatabase = new Database({
    host: process.env.DATABASE_HOST, //localhost
    user: process.env.DATABASE_USER, //root
    password: process.env.DATABASE_PASSWORD, //password
    database: process.env.DATABASE_NAME, //name_of_database
    waitForConnections: true,
    connectionLimit: 300,
    queueLimit: 0,
});

module.exports = sharedDatabase;
