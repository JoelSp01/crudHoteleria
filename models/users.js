const mongoose = require('mongoose'); //importa el modulo mongoose
const userSchema = new mongoose.Schema({ //crea un esquema de usuario
    Nombre:{ //campo nombre
        type: String, 
        required: true, 
    },
    CheckIn:{
        type: String, 
        required: true, 
    },
    CheckOut:{
        type: String, 
        required: true, 
    }, 
    Personas:{
        type: Number, 
        required: true, 
    }, 
    Cuartos:{
        type: Number, 
        required: true, 
    }, 
});

module.exports = mongoose.model('User', userSchema); //exporta el modelo de usuario