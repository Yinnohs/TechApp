const { findOneAndRemove } = require('../model/model.principal.js');
const Principal = require('../model/model.principal.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "losTecnicosNuevosYviejos123." 
const expiresTime = 24*60*60;


var PrincipalCtrl = {}

PrincipalCtrl.find = async (req,res)=>{
    if(req.userId != 1)res.status(401).send("Acceso no autorizado");
    else{
        const article = await Principal.find({}).exec();
        res.send(article);
    }
    
}


PrincipalCtrl.findOne = async(req,res)=>{
    const article = await Principal.findOne({_id: req.params.id}).exec();
    res.send(article);
}

PrincipalCtrl.findNew = async (req, res)=>{
    if(req.userId !=1) res.status(401).send("Acceso no autorizado");
    else{
        const article = await Principal.find({}).sort({_id: -1}).exec()
        let last = article[0]._id + 1;
        let sendObj = {
            _id: last,
            usuario:"",
            nombre:"",
            apellidos:"",
            telefono:"",
            fecha_inicio:"",
            fehca_fin:"",
            password:""
        } 
        res.send(sendObj);
    }
}

PrincipalCtrl.saveNew = async (req,res)=>{
    if(req.userId !=1) res.status(401).send("Acceso no autorizado");
    else{

        console.log(req.body)
        let newArticle = new Principal(req.body);
        await newArticle.save();

        const token = jwt.sign(
            {_id: newUser._id},
            SECRET_KEY,
            {expiresIn: expiresTime}
            )

            res.status(200).json(token);
    }
}

PrincipalCtrl.update = (req,res)=>{
    if(req.userId !=1) res.status(401).send("Acceso no autorizado");
    else{
        Principal.findByIdAndUpdate(req.params.id,{$set:{
            _id:req.body._id,
            usuario: req.body.usuario,
            nombre:req.body.nombre,
            apellidos:req.body.apellidos,
            telefono: req.body.telefono,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            password: req.body.password
        }},{new:false, runValidators:true}, (err, articles)=>{
            if (err)console.log(err);
            else res.json("Archivo Actualizado correctamente");

        })
    }
}

PrincipalCtrl.remove = (req,res)=>{
    if(req.userId !=1) res.status(401).send("Acceso no autorizado");
    else{
        Principal.findByIdAndRemove(req.params.id,(err, article)=>{
            if (err) console.log(err);
            else res.json("Archivo Eliminado Correctamente");
        })
    }
}

PrincipalCtrl.techNames = async (req,res)=>{
    const names = await Principal.find().distinct('nombre').exec()
    res.send(names);
}

PrincipalCtrl.singIn = async (req,res,next)=>{

    const{usuario,password} = req.body
    const userFind = await Principal.findOne({usuario:usuario});
    if(!userFind) return res.status(401).send('El email o la contraseña no existe');
    if(userFind.password !== password) return res.status(401).send('El email o la contraseña no existe');
    console.log(userFind);
    const token = jwt.sign(
        {_id: userFind._id},
        SECRET_KEY,
        {expiresIn: expiresTime}
        )
        res.status(200).json({token:token,id:userFind._id});
}


PrincipalCtrl.verifyToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("Acceso no Autorizado");
    }

    const token = req.headers.authorization.split(' ')[1]
    if(token ==='null'){
        return res.status(401).send("Acceso no Autorizado");
    }else{

        const payload = jwt.verify(token, SECRET_KEY)

        req.userId = payload._id;
        next();
    }
}

module.exports = PrincipalCtrl;