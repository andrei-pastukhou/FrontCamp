const mongoose = require("mongoose");
const passport = require("passport");
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
    let newUser = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password

    });
  newUser.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({message: 'User created!'});
    }
  });
};

// Go to login page
userController.login = (req, res) => {
    res.render('login');
};

// Post login
userController.doLogin = (req, res) => {
    // passport.authenticate('jwt')(req, res, function () {
    //     res.json({
    //         status: 'ok',
    //         token: 'sometoken',
    //     });
    //    // res.redirect('/');
    // });

    User.findOne({'username': req.body.username, 'password': req.body.password}, (err, user) => {

        if (!user) {
            res.status(401).json({status:'error', message: "no such user found"});
        } else {

            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = {id: user['_id']};
            var token = jwt.sign(payload, 'secret');
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
