const router = require('express').Router();

const { Dive } = require('../../models');

const { getLatest, getActiveMonth, create } = Dive;

router.get('/', async (req, res) => {
	const { rows } = await getLatest();
	res.json(rows);
});

router.get('/stats', async (req, res) => {
	if (req.query.data === 'most_active_month') {
		const { rows } = await getActiveMonth();
		res.json(rows[0]);
	} else {
		res.status(404).end();
	}
});

router.post('/', async ({ body }, res) => {
	try {
		const { rows } = await create(body);
		res.json(rows[0]);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
