const db = require('./connection.js');

db.query(`SELECT random_between(1, 5)`).then(({ rows }) => {
	console.log(rows);
});
