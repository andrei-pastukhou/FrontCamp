// As with any middleware it is quintessential to call next()
// if the user is authenticated

 const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.sendStatus(403)
};

module.exports = isAuthenticated;
