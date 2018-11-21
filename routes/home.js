const express = require('express');

const router = express.Router();

const usersData = require('../data');

router.route('/')

.get((req, res, next) => {
    return res.status(200).render('index', {pageTitle: 'Add a user'});
})

.post(express.urlencoded({extended: false}), (req, res, next) => {
    if(req.body['name'] && /^[a-zA-Z\s]+$/.test(req.body['name'])) {
        const user = { name: req.body['name'] };
        usersData.insertOne(user).then(success => {
            return res.status(301).redirect('/users');
        }).catch(err => {
            return newt(err);
        })
    } else {
        return res.status(301).redirect('/');
    }
});

module.exports = router;