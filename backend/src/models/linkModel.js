const { executeQuery } = require('../config/database');

class LinkModel {
  // Create link
  static async create(code, targetUrl) {
    const query = 'INSERT INTO links (code, target_url) VALUES (?, ?)';
    const result = await executeQuery(query, [code, targetUrl]);
    return result.insertId;
  }

  // Find by code
  static async findByCode(code) {
    const query = 'SELECT * FROM links WHERE code = ?';
    const rows = await executeQuery(query, [code]);
    return rows[0] || null;
  }

  // Check if custom code exists
  static async codeExists(code) {
    const query = 'SELECT COUNT(*) AS count FROM links WHERE code = ?';
    const rows = await executeQuery(query, [code]);
    return rows[0].count > 0;
  }

  // ❗ THIS IS THE FUNCTION CAUSING YOUR ERROR
  static async findAll() {
    const query = 'SELECT * FROM links ORDER BY created_at DESC';
    return await executeQuery(query);
  }

  // Search
  static async search(searchTerm) {
    const query = `
            SELECT * FROM links
            WHERE code LIKE ? OR target_url LIKE ?
            ORDER BY created_at DESC
        `;
    const term = `%${searchTerm}%`;
    return await executeQuery(query, [term, term]);
  }

 static async incrementClicks(code) {
  const updateQuery = `
    UPDATE links
    SET clicks = clicks + 1,
        last_clicked = NOW()
    WHERE code = ?
  `;

  await executeQuery(updateQuery, [code]);

  return this.findByCode(code);
}

  // Delete link
  static async delete(code) {
    const query = 'DELETE FROM links WHERE code = ?';
    const result = await executeQuery(query, [code]);
    return result.affectedRows > 0;
  }
}

module.exports = LinkModel;
