const router = require('express').Router()

const homeRoutes = require('./homeRoutes')
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboardRoutes')
const gameRoutes = require('./gameRoutes')
const deckbuilderRoutes = require('./deckbuilderRoutes')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/game', gameRoutes)
router.use('/deckbuilder', deckbuilderRoutes)

module.exports = router
