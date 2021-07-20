const {Schema, model} = require('mongoose');

const TareasSchema = new Schema({
    tecnico: {type:Number, unique:true},
    fecha: {type: String},
    cliente: {type:String},
    descripcion:{type:String},
    facturable:{type:Boolean},
    importe:{type:Number}
})
module.exports = model('tareas', TareasSchema);