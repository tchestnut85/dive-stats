const router = require('express').Router();

const { Location } = require('../../models');

router.get('/', async (req, res) => {
	const { rows } = await Location.getAll();
	res.json(rows);
});

router.get('/:id', async (req, res) => {
	const { rows } = await Location.getOne({ id: req.params.id });

	res.json(rows[0] || {});
});

router.get('/:id/stats', async (req, res) => {
	const { getAverageTime, getMaxDepth, getCertification } = Location;
	const { data } = req.query;
	const { id } = req.params;

	// let rows;

	const options = {
		duration: getAverageTime,
		depth: getMaxDepth,
		certification: getCertification,
	};

	if (options[data] === undefined) {
		res
			.status(404)
			.json({ message: `data not found for the query: ${data}` })
			.end();
		return;
	}

	// ({ rows } = await options[data]({ id }));
	const { rows } = await options[data]({ id });
	res.json(rows[0]);
});

module.exports = router;
