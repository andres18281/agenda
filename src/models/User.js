const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre:String,
  email: String,
  password1:String
});
/*
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password1: {
        type: String,
        required: [true, "Le contraseña es obligatoria"],
    }
    /*,
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: rolesValidos,
    },
    


});*/

/*
Usuario.findByIdAndUpdate(id, updBody, {
    new: true, //devuelve el objeto actualizado
    runValidators: true, //aplica las validaciones del esquema del modelo
    context: 'query' //necesario para las disparar las validaciones de mongoose-unique-validator
}, (err, usuarioDB) => {
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.json({
        ok: true,
        usuario: usuarioDB
    });
});


*/


/*
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})*/
module.exports = mongoose.model('User', usuarioSchema);