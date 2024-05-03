const router = require('express').Router();

const userRoutes = require('./userRoutes');
const dataRoutes = require('./dataRoutes');
const dataExtensionRoutes = require('./dataExtensionRoutes');

router.use('/users', userRoutes);
router.use('/data', dataRoutes);
router.use('/dataExtension', dataExtensionRoutes);

module.exports = router;
