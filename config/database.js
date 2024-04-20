const mongoose = require('mongoose');

const conenctDatabase = ()=>{
    mongoose.connect(process.env.DB_URL,{
    // mongoose.connect("mongodb://127.0.0.1:27017/wellfound-intern-assignment",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then((data)=>{
        console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((e)=>{
        console.log('error --> ' + e);
        console.error('error message: ', e.message);
    })
}

module.exports = conenctDatabase;