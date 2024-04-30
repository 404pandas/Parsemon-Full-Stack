const router = require('express').Router();
const { DataExtension } = require('../../models/');
const { apiGuard } = require('../../utils/authGuard');

router.post('/', apiGuard, async (req, res) => {
  try {
    const newDataExtension = await DataExtension.create({
      ...req.body,
      userId: req.session.user_id,
    });
    res.json(newDataExtension);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await DataExtension.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = DataExtension.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
