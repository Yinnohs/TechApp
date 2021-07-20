const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rma',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
})
.then(db=>{console.log('deb is connected')})
.catch(err=> console.log('the error is:', err))