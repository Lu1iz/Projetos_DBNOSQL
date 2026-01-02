const List = require('../models/List');

exports.getCustomList = async (req, res) => {
    try {
        const customListName = req.params.customListName;
        let list = await List.findOne({name: customListName}).exec();

        if(!list) {
            list = await List.create({
                name: customListName,
                items: []
            });
        }

        res.render('list', {
            listTitle: list.name,
            listName: list.name,
            newListItem: list.items
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor customizado!');
    }
};