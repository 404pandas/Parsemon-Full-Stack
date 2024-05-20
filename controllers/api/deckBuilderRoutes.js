const router = require('express').Router()
const { Deck } = require('../../models/')
const { apiGuard } = require('../../utils/authGuard')

// Creating a new deck
router.post('/', apiGuard, async (req, res) => {
  const { name, cards, totalCards } = req.body

  try {
    const newDeck = await Deck.create({
      name: name,
      cards: cards,
      totalCards: totalCards,
      userId: req.session.user_id,
    })
    res.json(newDeck)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Updating deck - drag in drag out on right hand side
router.put('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await Deck.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (affectedRows > 0) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
