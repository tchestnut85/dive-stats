const router = require('express').Router();

const { Location } = require('../../models');

const {
	getOne,
	getAll,
	create,
	getAverageTime,
	getMaxDepth,
	getCertification,
} = Location;

router.get('/', async (req, res) => {
	const { rows } = await getAll();
	res.json(rows);
});

router.get('/:id', async (req, res) => {
	const { rows } = await getOne({ id: req.params.id });

	res.json(rows[0] || {});
});

router.get('/:id/stats', async (req, res) => {
	const { data } = req.query;
	const { id } = req.params;

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

	const { rows } = await options[data]({ id });
	res.json(rows[0]);
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
