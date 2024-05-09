const router = require('express').Router()
const { Data } = require('../../models/')
const { apiGuard } = require('../../utils/authGuard')
// Updating deck - drag in drag out?
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
// get card - for all cards on left hand side
