const router = require('express').Router()
const { Data, DataExtension } = require('../models')
const { withGuard } = require('../utils/authGuard')

router.get('/', withGuard, async (req, res) => {
  try {
    const dataData = await Data.findAll({
      where: {
        userId: req.session.user_id,
      },
    })

    const datas = dataData.map((data) => data.get({ plain: true }))

    res.render('duel', {
      datas,
      loggedIn: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
