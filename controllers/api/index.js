const router = require('express').Router();

const diveRoutes = require('./dives');
const diverRoutes = require('./divers');
const locationRoutes = require('./locations');

router.use('/dives', diveRoutes);
router.use('/divers', diverRoutes);
router.use('/locations', locationRoutes);

module.exports = router;
