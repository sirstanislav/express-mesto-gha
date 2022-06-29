const router = require('express').Router();

const { createUser } = require('../controllers/login');

router.post('/signin', createUser);

module.exports = router;
