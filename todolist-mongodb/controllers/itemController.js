const {Item} = require('../models/Item');
const List = require('../models/List');
const date = require('../utils/date');

exports.getItems = async (__, res) => {
    try {
        let items = await Item.find();
        const day = date.getDate();

        res.render('list', {
            listTitle: day,
            listName: null,
            newListItem: items
        });
    } catch (error) {
        console.error('ERRO: ', error);
        res.status(500).send('Erro no servidor');
    }
};

exports.createItem = async (req, res) => {
    try {
        const {newItem} = req.body;
        const rawListName = req.body.listName;
        const listName = rawListName ? rawListName.trim().toLowerCase() : null;
        const isDefaultList = !listName || listName === date.getDate();

        if(!newItem)
            return res.status(400).send('Item Inválido!');

        //Lista padrão
        if(isDefaultList) {
            await Item.create({name: newItem});
            return res.redirect('/');
        }

        //Lista customizada
        const list = await List.findOne({name: listName});

        if(!list) return res.status(404).send('Lista não encontrada!');

        list.items.push({name: newItem});
        await list.save();

        res.redirect('/' + listName);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar item');
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const {checkbox} = req.body;
        const rawListName = req.body.listName;
        const listName = rawListName ? rawListName.trim().toLowerCase() : null;
        const isDefaultList = !listName || listName === date.getDate();

        if(!checkbox) return res.status(400).send('Id não encontrado!');

        //Lista padrão
        if(isDefaultList) {
            await Item.findByIdAndDelete(checkbox);
            return res.redirect('/');
        }

        //Lista customizada
        const resultDelete = await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkbox}}});
        
        if(!resultDelete) return res.status(404).send('Lista não encontrada!');
        
        res.redirect('/' + listName);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar item!');
    }
};