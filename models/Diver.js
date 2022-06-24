const db = require('../config/connection');

class Diver {
	getAll() {
		return db.query(`SELECT * FROM divers ORDER BY last_name`);
	}

	getOne({ id }) {
		return db.query(`SELECT * FROM divers WHERE id = $1`, [id]);
	}

	getTotalDives({ id }) {
		return db.query(
			`SELECT COUNT(diver_id) AS number_of_dives
      FROM dives
      WHERE diver_id = $1
      GROUP BY diver_id`,
			[id]
		);
	}
}

module.exports = new Diver();
