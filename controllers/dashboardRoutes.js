// const router = require('express').Router()
// const { Data, DataExtension } = require('../models')
// const { withGuard } = require('../utils/authGuard')

// router.get('/', withGuard, async (req, res) => {
//   try {
//     const dataData = await Data.findAll({
//       where: {
//         userId: req.session.user_id,
//       },
//     })

//     const datas = dataData.map((data) => data.get({ plain: true }))

//     res.render('dashboard', {
//       dashboard: true,
//       datas,
//       loggedIn: req.session.logged_in,
//     })
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// router.get('/new', withGuard, (req, res) => {
//   res.render('newData', {
//     dashboard: true,
//     loggedIn: req.session.logged_in,
//   })
// })

// router.get('/edit/:id', withGuard, async (req, res) => {
//   try {
//     const dataData = await Data.findByPk(req.params.id)

//     if (dataData) {
//       const data = dataData.get({ plain: true })

//       res.render('editData', {
//         dashboard: true,
//         data,
//         loggedIn: req.session.logged_in,
//       })
//     } else {
//       res.status(404).end()
//     }
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// router.get('/dataExtension/edit/:id', withGuard, async (req, res) => {
//   try {
//     const dataExtensionData = await DataExtension.findByPk(req.params.id)
//     console.log(dataExtensionData)
//     if (dataExtensionData) {
//       const dataExtension = dataExtensionData.get({ plain: true })

//       res.render('editDataExtension', {
//         dashboard: true,
//         dataExtension,
//         loggedIn: req.session.logged_in,
//       })
//     } else {
//       res.status(404).end()
//     }
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// module.exports = router
