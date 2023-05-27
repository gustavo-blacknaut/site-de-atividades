const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  cliente: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
