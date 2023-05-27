const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', (req, res) => {
  res.render('login');
});


router.post('/', async (req, res) => {
  const email = req.body.user.toString().replace(/\./g, '');

  if (!await Cliente.exists({ email: email, senha: { $exists: true } })) {
    return res.redirect('/registrar');
  }

  const cliente = await Cliente.findOne({ email: email }, 'senha');
  if (req.body.senha === cliente.senha) {
    req.session.email = email;
    req.session.senha = cliente.senha;

    if (await Cliente.exists({ email: email, admin: true })) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/atividades');
    }
  } else {
    return res.render('error', {
      title: 'Senha Inválida!',
      err: 'A senha é inválida!'
    });
  }
});
  
module.exports = router;