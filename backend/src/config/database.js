const { Pool } = require("pg");
require("dotenv").config();

// PostgreSQL connection pool for Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


// Initialize DB and ensure table exists
const initDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully");

    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        last_clicked TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Optional performance indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_code ON links (code);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_created ON links (created_at);`);

    console.log("✅ Database tables initialized");
    client.release();
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    throw error;
  }
};

// Query helper
const executeQuery = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows; // PostgreSQL returns data in rows
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
};

module.exports = { pool, initDatabase, executeQuery };
