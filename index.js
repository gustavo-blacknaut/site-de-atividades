const express = require('express');
const session = require('express-session');
const atividadesRouter = require('./routes/atividades');
const adminRouter = require('./routes/admin');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const authenticator = require('./middleware/authenticator');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://blacknaut:blacknott123@cluster3.dm3v7cy.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
.catch((error) => console.error('Erro ao conectar com o MongoDB:', error))

app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use('/atividades', authenticator, atividadesRouter);
app.use('/admin', authenticator, adminRouter);
app.use('/login', loginRouter);
app.use('/registrar', registerRouter);
app.use('/logout', logoutRouter);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('Ligado em http://localhost:3000');
});