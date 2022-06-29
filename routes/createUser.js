const router = require('express').Router();

const { createUser } = require('../controllers/createUser');

router.post('/signup', createUser);

module.exports = router;
