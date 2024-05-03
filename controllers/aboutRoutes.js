const router = require('express').Router()

router.get('/', async (req, res) => {
  res.render('game')
})

module.exports = router
