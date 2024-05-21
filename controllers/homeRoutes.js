const router = require('express').Router()
const { Card, Deck, User } = require('../models/')
const { withGuard, withoutGuard } = require('../utils/authGuard')

router.get('/', async (req, res) => {
  try {
    res.render('home', { loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', withoutGuard, (req, res) => {
  try {
    res.render('login')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/signup', withoutGuard, (req, res) => {
  try {
    res.render('signup')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/deckbuilder', withGuard, async (req, res) => {
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

router.get('/dashboard', withGuard, async (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.user_id
  })
})

module.exports = router
