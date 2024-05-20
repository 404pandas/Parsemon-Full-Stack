const router = require('express').Router()
const { Card, Deck } = require('../models/')
const { apiGuard } = require('../utils/authGuard')

// get all cards - for all cards on left hand side
router.get('/', apiGuard, async (req, res) => {
  try {
    const cardData = await Card.findAll()

    const cards = cardData.map((card) => card.get({ plain: true }))

    const deckData = await Deck.findAll({
      where: {
        userId: req.session.user_id,
      },
    })

    const decks = deckData.map((deck) => deck.get({ plain: true }))

    res.render('deckbuilder', {
      cards,
      decks,
      loggedIn: req.session.user_id
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// get decks for top

module.exports = router
