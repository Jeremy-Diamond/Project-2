const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

//console.log('test');
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the Hogwarts Directory add student or teacher to your url to find what you are looking for.');});

router.use('/students',require('./students'));

router.use('/teachers',require('./teachers'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res,next) {
    req.logout(function(err) {
        if (err) {
            return next(err); }
        res.redirect('/');
        });
    });

module.exports = router;