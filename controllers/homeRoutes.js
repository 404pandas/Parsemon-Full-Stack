const router = require('express').Router();
const { Data, DataExtension, User } = require('../models/');
const { withGuard, withoutGuard } = require('../utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const dataData = await Data.findAll({
      include: [User],
    });

    const datas = dataData.map((data) => data.get({ plain: true }));

    res.render('home', { datas, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/data/:id', async (req, res) => {
  try {
    const dataData = await Data.findByPk(req.params.id, {
      include: [
        User,
        {
          model: DataExtension,
          include: [User],
        },
      ],
    });

    if (dataData) {
      const data = dataData.get({ plain: true });

      res.render('data', { data, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withoutGuard, (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', withoutGuard, (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
