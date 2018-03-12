const User = require("../models/user");
const userController = {};
const jwt = require('jsonwebtoken');
// Restrict access to root page
userController.home = (req, res) => {
    res.render('index', {user: req.user});
};

// Go to registration page
userController.register = (req, res) => {
    res.render('register');
};

// Post registration
userController.doRegister = (req, res) => {
    User.findOne({'username': req.body.username}, (err, user) => {
        if (user) {
            res.status(409).json({status: 'error', message: "User with this username is exist"});
        } else {
            let newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            newUser.save(function (err) {
                if (err) {
                    res.sendStatus(201);
                } else {
                    res.json({
                        status: 'ok',
                        message: 'User created!'
                    });
                }
            });
        }
    });
};

// Go to login page
userController.login = (req, res) => {
    res.render('login');
};

// Post login
userController.doLogin = (req, res) => {
    User.findOne({'username': req.body.username, 'password': req.body.password}, (err, user) => {
        if (!user) {
            res.status(401).json({status: 'error', message: "no such user found"});
        } else {
            let payload = {id: user['_id']};
            let token = jwt.sign(payload, 'secret');
            res.json({status: "ok", token: token});
        }
    });
};

// logout
userController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = userController;
