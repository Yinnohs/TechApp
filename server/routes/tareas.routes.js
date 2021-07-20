const express = require('express');
const router = express.Router();
const Tareas = require('../controller/tareas.controller.js');

router.get('/', Tareas.verifyToken, Tareas.find);
router.get('/tecnico/:id', Tareas.verifyToken, Tareas.findByTechnician);
router.get('/tarea/:id',  Tareas.verifyToken, Tareas.findById)
router.get('/tarea/nueva', Tareas.verifyToken,Tareas.taskNew)
router.get('/estadisticas',Tareas.verifyToken, Tareas.stadistics)
router.post('/new', Tareas.verifyToken, Tareas.saveNew);
router.delete('/remove/:id', Tareas.verifyToken, Tareas.remove)
router.post('/update/:id', Tareas.verifyToken, Tareas.update)



module.exports = router;