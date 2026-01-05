import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lojaDb');
    } catch (error) {
        console.error('Erro na conexão Db: ', error);
        process.exit(1);
    }
};

export default connectDb;