const mongoose = require('mongoose')

const url = (process.env.DBENV === 'offline')?process.env.MONGOURL:process.env.MONGOATLASURL

mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    poolSize:10,
    socketTimeoutMS:45000,
})

mongoose.connection.on('error',err=>(console.log(err)))

module.exports = mongoose.connection