const {Schema, model} = require('mongoose');

const PrincipalSchema = new Schema({
    _id: {type:Number},
    usuario: {type: String, unique:true},
    password: {type:String},
    nombre:{type:String},
    apellidos:{type:String},
    telefono:{type:String},
    fecha_inicio:{type:String},
    fecha_fin:{type:String}
})
module.exports = model('tecnicos',PrincipalSchema); 