const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicpathdirectory = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebar and views location
app.set('view engine', 'hbs');
app.set('views', viewpath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicpathdirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manikandan G'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Nature View',
        name: 'Manikandan G'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {

        title: 'Help Message',
        name: 'ManiKandan G'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please Provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must providea search term'
        })
    }
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manikandan',
        Errormsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manikandan',
        Errormsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on '+ port)
})