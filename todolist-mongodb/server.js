const express = require('express');
const connectDb = require('./config/db');

const port = 3000;
const app = express();

connectDb();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', require('./routes/itemRoutes'));
app.use('/', require('./routes/customRoutes'));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
});