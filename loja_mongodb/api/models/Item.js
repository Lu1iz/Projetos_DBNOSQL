import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Campo Obrigatório'],
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: [0, 'Preço não pode ser negativo']
    },

    stock: {
        type: Number,
        required: true,
        min: [0, 'Estoque não pode ser negativo'],
        validate: {
            validator: Number.isInteger,
            message: 'Estoque deve ser um número inteiro'
        }
    },

    fone: {
        type: String,
        required: true,
    }
});

export const Item = mongoose.model('Item', itemSchema);
