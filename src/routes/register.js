const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Usuario = require('./../models/User');

router.post('/', function (req, res) {
  let body = req.body;
  let { nombre, email, password1 /*,role*/ } = body;
    let usuario = new Usuario({
        nombre,
        email,
        password1: bcrypt.hashSync(password1, 10),
       // role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});
module.exports = router;