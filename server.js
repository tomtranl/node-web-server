const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) =>
{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>
    {
        if (err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) =>
// {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>
{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>
{
    return text.toUpperCase();
});

// home page property: home title, welcome ... and copyright
app.get('/', (req, res) =>
{
    res.render('home.hbs', 
    {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) =>
{
    res.render('about.hbs',
    {
        pageTitle: 'About Page',
    });
});

// /bad --> send back json with errorMessage
app.get('/bad', (req, res) =>
{
    res.send({errorMessage: 'Unable to handle request'});
});

app.listen(3000, () =>
{
    console.log('Server is up port 3000')
});

//maintenance hbs no parital
// render h1-- 'We'll be right back
// and p tag -- 'The site is being updated'
// render in new middleware