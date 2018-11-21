const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const routes = fs.readdirSync(path.resolve('routes'), {encoding: 'utf8'})
    .map(fileName => require(path.resolve('routes', fileName)));

app.set('PORT', process.env.PORT || 8080);
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(express.static(path.resolve('public')));

app.use((req, res, next) => {
    res.locals.path = req.originalUrl;
    next();
});

app.use(routes);

app.use((req,res, next) => {
    return res.status(404).render('404', {pageTitle: 'Not Found'});
});

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).render('500', {pageTitle: 'Internal error'});
});

app.listen(app.get('PORT'), () => {
    console.log(`express app listening on port: ${app.get('PORT')}`.toUpperCase());
});