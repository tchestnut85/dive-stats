const db = require('../config/connection');

class Location {
	getAll() {
		return db.query(`SELECT * FROM locations ORDER BY name`);
	}

	getOne({ id }) {
		return db.query(`SELECT * FROM locations WHERE id = $1`, [id]);
	}

	getAverageTime({ id }) {
		return db.query(
			`SELECT AVG(duration)::INT AS average_duration FROM dives
      WHERE location_id = $1
      GROUP BY location_id`,
			[id]
		);
	}

	getMaxDepth({ id }) {
		return db.query(
			`SELECT 
        CONCAT(divers.first_name, ' ', divers.last_name) AS diver_name,
        dives.depth
      FROM dives
      LEFT JOIN divers ON dives.diver_id = divers.id
      WHERE dives.depth = (
        SELECT MAX(depth)
        FROM dives
        WHERE location_id = $1
      )`,
			[id]
		);
	}

	getCertification({ id }) {
		return db.query(
			`WITH certs AS (
        SELECT DISTINCT dives.diver_id, certifications.name from dives
        LEFT JOIN divers ON dives.diver_id = divers.id
        LEFT JOIN certifications ON divers.certification_id = certifications.id
        WHERE dives.location_id = $1
        GROUP BY dives.diver_id, certifications.name
      )
      SELECT name FROM certs
      GROUP BY name
      ORDER BY COUNT(name) DESC LIMIT 1`,
			[id]
		);
	}

	create({ name, lat, long, tags }) {
		return new Promise(async (resolve, reject) => {
			const client = await db.getClient();

			try {
				await client.query('BEGIN');

				const results = await client.query(
					`
					INSERT INTO locations (name, coordinates)
					VALUES ($1, POINT($2, $3))
					RETURNING *`,
					[name, lat, long]
				);

				console.log(results.rows[0]);

				if (tags && tags.length > 0) {
					for (const tag of tags) {
						console.log('tag:', tag);
						await client.query(
							`INSERT INTO tags (location_id, name)
							VALUES ($1, $2)`,
							[results.rows[0].id, tag]
						);
					}
				}

				await client.query('COMMIT');
				resolve(results);
			} catch (err) {
				await client.query('ROLLBACK');
				reject(err);
			}

			client.release();
		});
	}
}

module.exports = new Location();
