const router = require('express').Router()

const userRoutes = require('./userRoutes')
const dataRoutes = require('./dataRoutes')
const dataExtensionRoutes = require('./dataExtensionRoutes')
const deckBuilderRoutes = require('./deckBuilderRoutes')

router.use('/users', userRoutes)
router.use('/data', dataRoutes)
router.use('/dataExtension', dataExtensionRoutes)
router.use('/deckBuilder', deckBuilderRoutes)

module.exports = router
