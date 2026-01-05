import {Item} from "../models/Item.js";

const getItems = async (__, res) => {
    try {
        let items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error('ERRO: ', error);
        res.status(500).json({message: 'Erro no servidor'});
    }
};

const createItem = async (req, res) => {
    try {
        const {name, price, stock, fone} = req.body;
        
        if (!name || price == null || stock == null || !fone) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        const newItem = await Item.create({name: name, price: price, stock: stock, fone: fone});
        res.status(200).json(newItem);
    } catch (error) {
        console.error('ERRO: ', error);
        res.status(500).json({message: 'Erro no servidor'});
    }
};

const deleteItems = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);

        if(!deletedItem) return res.status(404).json({message: 'Item não encontrado'});

        res.status(200).json({message: 'Item removido com sucesso!'});
    } catch (error) {
        console.error('ERRO: ', error);
        res.status(500).json({message: 'Erro no servidor'});
    }
};

const updateItem = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, price, stock, fone} = req.body;

        if (!name || price == null || stock == null || !fone) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

         const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, price, stock, fone },
            { new: true, runValidators: true }
        );

        if(!updatedItem) return res.status(404).json({message: 'Item não encontrado'});

        res.status(200).json({message: 'Item atualizado com sucesso!'});
    } catch (error) {
        console.error('ERRO: ', error);
        res.status(500).json({message: 'Erro no servidor'});
    }
};

export default {getItems, createItem, deleteItems, updateItem};