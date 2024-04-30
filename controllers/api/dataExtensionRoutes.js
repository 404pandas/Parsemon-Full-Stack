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

module.exports = router;
