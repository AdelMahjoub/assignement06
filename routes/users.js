const express = require('express');

const router = express.Router();

const usersData = require('../data');

router.get('/users', (req, res, next) => {
    usersData.find().then(users => {
        return res.status(200).render('users', { users, pageTitle: 'Users List'});
    }).catch(err => {
        return next(err);
    });
});

module.exports = router;