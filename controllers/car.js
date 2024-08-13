const User = require('../models/user.js')
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  res.render('cars/index.ejs', {
    foundPantry: user.showroom
  })
});

router.get('/new', (req, res) => {
    res.render('cars/new.ejs')
  });

router.post('/', async (req, res) => {
    console.log(req.session)
    try {
        const foundUser = await User.findById(req.session.user._id)
        console.log(foundUser)
        foundUser.showroom.push(req.body)
        await foundUser.save()
        res.redirect(`/users/${foundUser._id}/cars`)
    } catch (error) {
        res.redirect('/')
    }
}); 

router.get('/showroom', async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(user._id);

    if (!user) {
      return res.status(404).send('User not found')
    }
    res.locals.foundShowroom = user.showroom;
    res.render('/views/pantry/index.ejs'), {
      foundShowroom: user.showroom
  }
} catch (error) {
  res.status(400).json({ msg: error.message })

}
})

router.delete('/:itemId', async (req, res) => {
  const userId = req.session.user._id;
  
try {
    const foundUser = await User.findById(userId);
    foundUser.showroom.pull(req.params.itemId);
    await foundUser.save()
    res.redirect(`/users/${userId}/cars`)
    } catch (error) {
    res.redirect('/')
}})

router.get('/:id/edit', async (req, res) => {
  try {
    const foundUser = await User.findOne({_id: req.session.user._id})
    const foundCar = foundUser.showroom.id(req.params.id)
    res.render('cars/edit.ejs', {
      item: foundCar
    })
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})

router.put('/:id', async (req, res) => {
  const userId = req.session.user._id
  const user = await User.findById(userId)
  try {
    const carItem = user.showroom.id(req.params.id)
    carItem.set(req.body)
    await user.save()
      res.redirect(`/users/${user._id}/cars`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})


module.exports = router;