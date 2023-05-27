const express = require('express');
const router = express.Router();
const authenticator = require('../middleware/authenticator');
const Cliente = require('../models/Cliente');

const fs = require('fs');

let atividades = fs.existsSync('atividades.json') ? JSON.parse(fs.readFileSync('atividades.json')) : [];

router.get('/', authenticator, async(req, res) => {
  const eUmAluno = await Cliente.exists({ email: req.session.email, cliente: true });
  const { username } = await Cliente.findOne({ email: req.session.email }, 'username');

  res.render('tarefas', {
    eUmAluno: eUmAluno,
    atividades: atividades,
    username: username
  });
});

module.exports = router;
