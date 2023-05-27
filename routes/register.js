const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const email = req.body.user.toString().replace(/\./g, '');

  if (!await Cliente.exists({ email: email })) {
    await Cliente.create({
      email: email,
      senha: req.body.senha,
      username: req.body.username
    });
    return res.redirect('/login');
  }

  return res.render('error', {
    title: 'Email já existente',
    err: 'Já existe um email nessa conta!'
  });
});

module.exports = router;
