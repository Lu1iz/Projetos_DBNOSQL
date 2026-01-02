const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todolistDb');
        console.log('MongoDb conectado');
    } catch (error) {
        console.error('Erro na conexão DB: ', error);
        process.exit(1);
    }
};

module.exports = connectDb;