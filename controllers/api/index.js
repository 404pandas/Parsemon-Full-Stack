const router = require('express').Router()

const userRoutes = require('./userRoutes')
const deckBuilderRoutes = require('./deckBuilderRoutes')

router.use('/users', userRoutes)
router.use('/deckBuilder', deckBuilderRoutes)

module.exports = router
