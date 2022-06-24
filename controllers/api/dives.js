const router = require('express').Router();

const { Dive } = require('../../models');

router.get('/', async (req, res) => {
	const { rows } = await Dive.getLatest();
	res.json(rows);
});

router.get('/stats', async (req, res) => {
	if (req.query.data === 'most_active_month') {
		const { rows } = await Dive.getActiveMonth();
		res.json(rows[0]);
	} else {
		res.status(404).end();
	}
});

module.exports = router;
