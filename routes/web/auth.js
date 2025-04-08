const authRouter = require('express').Router();

authRouter.get('/home', (req, res) => {
    res.render('auth/home.ejs', { user: null, title: 'Home', settings: false });
})

authRouter.get('/register', (req, res) => {
    res.render('auth/register.ejs', { user: null, title: 'Register' });
})

authRouter.get('/login', (req, res) => {
    res.render('auth/login.ejs', { user: null, title: 'Login' });
})

authRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authRouter;