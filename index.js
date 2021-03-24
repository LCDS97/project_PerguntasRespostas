// Bibliotecas a ser utilizada
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feito com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Utilizando o framework ejs para back-end do Projeto
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Utilizando bodyParser para traduzir em js dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas do Projeto
app.get("/",(req, res) => {

    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });


});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {
    
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta");
        }
        else {
            res.redirect("/");
        }
    });
});


app.listen(4000, ()=> {
    console.log("App rodando!");
});