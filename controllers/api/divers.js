const router = require('express').Router();

const { Diver } = require('../../models');

const { getAll, getOne, getTotalDives, create } = Diver;

router.get('/', async (req, res) => {
	const { rows } = await getAll();
	res.json(rows);
});

router.get('/:id', async (req, res) => {
	const { rows } = await getOne({ id: req.params.id });
	res.json(rows[0] || {});
});

router.get('/:id/stats', async (req, res) => {
	if (req.query.data === 'total_dives') {
		const { rows } = await getTotalDives({ id: req.params.id });
		res.json(rows[0] || {});
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
