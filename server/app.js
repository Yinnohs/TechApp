require('./database/dataBase');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const serveIndex = require('serve-index');

app.set('port', process.env.PORT || 4500 );
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/", require('./routes/auth.routes.js'))
app.use("/tecnicos", require('./routes/router'));
app.use("/tareas", require('./routes/tareas.routes.js'));


module.exports= app;