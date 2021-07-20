const { isValidObjectId } = require('mongoose');
const Tareas = require('../model/model.tareas');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "losTecnicosNuevosYviejos123." 
const expiresTime = 24*60*60;


var TareasCtrl = {}

TareasCtrl.find = async (req,res)=>{
    const job = await Tareas.find({}).exec();
    res.send(job);
}

TareasCtrl.findByTechnician = async(req,res)=>{
    const sender = await Tareas.find({tecnico: req.params.id}).exec();
    res.send(sender);
}

TareasCtrl.findById = async(req,res)=>{
    if(req.params.id == "nueva"){
        res.status(200).json("Agrege una nueva Tarea");
    }else{
    
        const sender = await Tareas.findById(req.params.id).exec();
        res.send(sender);
    }
    
}

TareasCtrl.taskNew = (req,res)=>{
    const newTask ={
        _id:"",
        tecnico:"",
        fecha:"",
        cliente:"",
        descripcion:"",
        facturable:"",
        importe:"",
    }
    res.send(newTask);
} 

TareasCtrl.saveNew = (req,res)=>{
    console.log('entro a save new', req.body);
    const saveNew ={
        tecnico: req.body.tecnico,
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        descripcion: req.body.descripcion,
        facturable: false,
        importe:req.body.importe
    }
    console.log(req.body == {})
    if(req.body != {}){
    const newTarea = new Tareas(saveNew);
    newTarea.save((err)=>{
        if(err) console.log(err);
        else res.json("Tarea Agregada Correctamente");
    })
    }else{
        res.status(401).json('No se agregó nada al formulario');
    }
}

TareasCtrl.update = (req,res)=>{
    Tareas.findByIdAndUpdate(req.params.id,{
        _id: req.body._id,
        tecnico: req.body.tecnico,
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        descripcion: req.body.descripcion,
        facturable: req.body.facturable,
        importe: req.body.importe
    },{new:false, runValidators:true},(err, article)=>{
        if(err) console.log(err)
        else res.status(200).json("Actualizado correctamente")
    })
}

// TareasCtrl.update =(req,res)=>{}

TareasCtrl.remove =(req,res)=>{
    Tareas.findByIdAndRemove(req.params.id,(err,articles)=>{
        if (err) console.log(err)
        else res.json("Tarea Eliminada Correctamente");
    })
}

TareasCtrl.stadistics = async (req,res,next)=>{
    const stadistics = await Tareas.aggregate(
        [
            {
                $group:
                {
                    _id:{year:{$substr: ["$fecha", 0, 4]}, month:{$substr:["$fecha", 5, 2]},tecnico: "$tecnico"},
                    generalTotal: {$sum: "$importe"},
                    cantidad: {$sum: 1}
                }
            },
            {$set:{"year": "$_id.year", "month":"$_id.month","tecnico":"$_id.tecnico", "quantity":"$cantidad"}},
            {$project: {_id:0, year:1, month:1, tecnico:1, generalTotal:1, quantity:1 }},
            {$sort: {year:1, month:1, tecnico:1}}
        ]
    )
    res.send(stadistics);
}


TareasCtrl.verifyToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("Acceso no Autorizado");
    }

    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(401).send("Acceso no Autorizado");
    }
    else{
        const payload = jwt.verify(token, SECRET_KEY)

        req.userId = payload._id;
        next();
    }
}


module.exports = TareasCtrl