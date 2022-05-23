var express = require('express');
var router = express.Router();
const users = require("../usersData");
const methods = require("../methods");

const registerPage = "../views/users/register";
const loginPage = "../views/users/login";

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res) {
    res.render('home', { title: 'Express' });
});

router.get('/login', function(req, res) {
    res.render(loginPage);
});

router.get('/register', function(req, res) {
    res.render(registerPage);
});

router.post('/register', (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    //Validando
    if (password === confirmPassword) {
        //Validar si el correo Existe
        if (users.data.find(u => u.email === email)) {
            res.render(registerPage, {
                message: "Usuario ya registrado",
                messageClass: "alert-success"
            });
        }

        const phash = methods.getHashedPassword(password);

        //almacenar datos
        users.data.push({
            fullName,
            email,
            password: phash
        });
        res.render(loginPage, {
            message: "Registro Completo",
            messageClass: "alert-success"
        });


    } else {
        res.render(registerPage, {
            message: "Las contraseñas no coinciden",
            messageClass: "alert-danger"
        });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = methods.getHashedPassword(password);

    //Validar datos
    const dataUser = users.data.find(u => {
        return u.email == email && hashedPassword === u.password;
    });

    if (dataUser) {
        const authToken = methods.generateTokens();
        methods.authTokens[authToken] = dataUser;
        res.cookie('AuthToken', authToken);
        res.redirect('/home');
    } else {
        res.render(loginPage, {
            message: "Usuario o contraseña no existen",
            messageClass: "alert-danger"
        });
    }
});

module.exports = router;