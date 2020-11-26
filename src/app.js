const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const htmlpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.use(express.static(htmlpath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weathering With You",
        name: "Haris"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Haris"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is Help Page",
        title: "Help",
        name: "Haris"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "Please provide search."
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: "404",
        name: "Haris",
        errorMessage: "Help Page Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: "404",
        name: "Haris",
        errorMessage: "Page Not Found."
    })
})

app.listen(port, () => {
    console.log('Server is Up!')
})