const mysql = require('mysql2/promise');
require('dotenv').config();

// Connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection and create table if needed
const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create links table with proper schema
    await connection.query(`
      CREATE TABLE IF NOT EXISTS links (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        clicks INT DEFAULT 0,
        last_clicked DATETIME NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_code (code),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database tables initialized');
    connection.release();
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

// Execute query helper
const executeQuery = async (query, params = []) => {
  try {
    const [rows] = await pool.query(query, params);

    return rows;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
};


module.exports = { pool, initDatabase, executeQuery };