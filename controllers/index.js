const router = require('express').Router()

const homeRoutes = require('./homeRoutes')
const apiRoutes = require('./api/')
const dashboardRoutes = require('./dashboardRoutes')
const gameRoutes = require('./gameRoutes')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/game', gameRoutes)

module.exports = router
