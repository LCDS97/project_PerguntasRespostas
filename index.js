// Bibliotecas a ser utilizada
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Utilizando o framework ejs para back-end do Projeto
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Utilizando bodyParser para traduzir em js dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas do Projeto
app.get("/",(req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {
        res.send("Formulario enviado!")
});


app.listen(4000, ()=> {
    console.log("App rodando!");
});