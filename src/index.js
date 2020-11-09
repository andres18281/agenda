const express = require('express');
const morgan = require('morgan');

const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mevn-crud')
        .then(db=>console.log("conectando"))
        .catch(err=>console.log(err));

// settings

app.set('port', process.env.PORT || 3000);
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';
// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/login',require('./routes/login'));
app.use('/api/register',require('./routes/register'));
// static
app.use(express.static(path.join(__dirname, 'public')));

// listenning on port
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
