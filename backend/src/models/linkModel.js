const { executeQuery } = require('../config/database');

class LinkModel {
  // Create link
  static async create(code, targetUrl) {
    const query = `
      INSERT INTO links (code, target_url)
      VALUES ($1, $2)
      RETURNING id
    `;
    const result = await executeQuery(query, [code, targetUrl]);
    return result.rows[0].id;
  }

  // Find by code
  static async findByCode(code) {
    const query = `
      SELECT *
      FROM links
      WHERE code = $1
      LIMIT 1
    `;
    const result = await executeQuery(query, [code]);
    return result.rows[0] || null;
  }

  // Check if custom code exists
  static async codeExists(code) {
    const query = `
      SELECT COUNT(*) AS count
      FROM links
      WHERE code = $1
    `;
    const result = await executeQuery(query, [code]);
    return Number(result.rows[0].count) > 0;
  }

  // Get all links
  static async findAll() {
    const query = `
      SELECT *
      FROM links
      ORDER BY created_at DESC
    `;
    const result = await executeQuery(query);
    return result.rows;
  }

  // Search by code or URL
  static async search(searchTerm) {
    const query = `
      SELECT *
      FROM links
      WHERE code ILIKE $1 OR target_url ILIKE $2
      ORDER BY created_at DESC
    `;
    const term = `%${searchTerm}%`;
    const result = await executeQuery(query, [term, term]);
    return result.rows;
  }

  // Increment clicks + update timestamp
  static async incrementClicks(code) {
    const query = `
      UPDATE links
      SET clicks = clicks + 1,
          last_clicked = NOW()
      WHERE code = $1
      RETURNING *
    `;
    const result = await executeQuery(query, [code]);
    return result.rows[0] || null;
  }

  // Delete link
  static async delete(code) {
    const query = `
      DELETE FROM links
      WHERE code = $1
    `;
    const result = await executeQuery(query, [code]);
    return result.rowCount > 0;
  }
}

module.exports = LinkModel;
