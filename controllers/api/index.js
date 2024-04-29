const router = require('express').Router();

const userRoutes = require('./userRoutes');
const dataRoutes = require('./dataRoutes');

router.use('/users', userRoutes);
router.use('/data', dataRoutes);

module.exports = router;
