const router = require('express').Router()
const { Card } = require('../models/')

// get all cards - for all cards on left hand side
router.get('/', async (req, res) => {
  try {
    const cardData = await Card.findAll()

    const cards = cardData.map((card) => card.get({ plain: true }))
    console.log(cards)
    res.render('deckbuilder', {
      cards,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
