const router = require('express').Router();

const { Diver } = require('../../models');

router.get('/', async (req, res) => {
	const { rows } = await Diver.getAll();
	res.json(rows);
});

router.get('/:id', async (req, res) => {
	const { rows } = await Diver.getOne({ id: req.params.id });
	res.json(rows[0] || {});
});

router.get('/:id/stats', async (req, res) => {
	if (req.query.data === 'total_dives') {
		const { rows } = await Diver.getTotalDives({ id: req.params.id });
		res.json(rows[0] || {});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
