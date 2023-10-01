const router = require('express').Router();

router.use('/', require('./swagger'));

//console.log('test');
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the Hogwarts Directory add student or teacher to your url to find what you are looking for.');});

router.use('/students',require('./students'));

router.use('/teachers',require('./teachers'));

module.exports = router;