const express = require('express');

var app = express();

//definir motor de planillas a utilizar
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    //res.send("Programación Computacional IV");
    res.render('index', { title: "Programacion Computacional IV", message: "Express con Jade" });
});

/*app.route('/test').get(function(req, res) {
    res.send("Test page");
});*/

app.get('/test', function(req, res) {
    res.render('test', { title: "Programacion Computacional IV || Test", message: "Usted esta en Test" });
});

app.get('/r2', function(req, res) {
    res.render('r2', { title: "Programacion Computacional IV", message: "Usted esta en Test" });
});

const server = app.listen(3000);