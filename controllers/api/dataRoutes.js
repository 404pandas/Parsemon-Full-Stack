const router = require('express').Router()
const { Data } = require('../../models/')
const { apiGuard } = require('../../utils/authGuard')

// Adding apiGuard to a route will require the user to be logged in to access it
router.post('/', apiGuard, async (req, res) => {
  const body = req.body

  try {
    const newData = await Data.create({ ...body, userId: req.session.user_id })
    res.json(newData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await Data.update(req.body, {
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

router.delete('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = Data.destroy({
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
