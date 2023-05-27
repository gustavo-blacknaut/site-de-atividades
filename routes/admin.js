const express = require('express');
const router = express.Router();
const authenticator = require('../middleware/authenticator');
const fs = require('fs');
const path = require('path');
const Cliente = require('../models/Cliente');

router.get('/', authenticator, (req, res) => {
  res.render('admin');
});

//admin/alunos
router.get('/alunos', authenticator, (req, res) => {
    res.render('adicionacliente');
});
  
router.post('/alunos', authenticator, async(req, res) => {
    const email = req.body.email.toString().replace(/\./g, '');
  
    if (!await Cliente.exists({ email: email })) {
      await Cliente.create({ email: email, cliente: true });
      return res.render('error', {
        title: 'Novo aluno',
        err: 'Novo aluno adicionado com sucesso'
      });
    } else {
      return res.render('error', {
        title: 'Ocorreu um erro',
        err: 'Este email já é um aluno'
      });
    }    
});

//admin/tarefas
let atividades = fs.existsSync('atividades.json') ? JSON.parse(fs.readFileSync('atividades.json')) : [];
let proximoIndiceAtividade = atividades.length;

async function configurarAtividade(titulo, descricao, link) {
  const atividadeEncontrada = atividades[proximoIndiceAtividade];
  
  if (atividadeEncontrada) {
    Object.assign(atividadeEncontrada, { titulo, descricao, link });
    proximoIndiceAtividade++;
    salvarAtividades();
  }
}

async function salvarAtividades() {
  fs.writeFileSync('atividades.json', JSON.stringify(atividades));
}

router.get('/tarefas', authenticator, (req, res) => {
    res.render('adicionatarefas');
});
  
router.post('/tarefas', authenticator, (req, res) => {
    const { titulo, descricao, link } = req.body;
    const atividade = {
      titulo,
      descricao,
      link
    };
    
    atividades.push(atividade);
    configurarAtividade(titulo, descricao, link);
    
    return res.render('error', {
        title: 'Atividade adicionada',
        err: 'Atividade adicionada com sucesso'
    })
});

module.exports = router;
