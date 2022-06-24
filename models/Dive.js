const db = require('../config/connection');

class Dive {
	getLatest() {
		return db.query(`SELECT * FROM dives ORDER BY dive_date DESC LIMIT 100`);
	}

	getActiveMonth() {
		return db.query(
			`SELECT DATE_TRUNC('month', dive_date) AS month, COUNT(*) AS dive_count
      FROM dives
      WHERE dive_date > NOW() - INTERVAL '1 year'
      GROUP BY month
      ORDER BY dive_count DESC LIMIT 1`
		);
	}
}

module.exports = new Dive();
