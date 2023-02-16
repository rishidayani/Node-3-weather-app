const express = require('express')
const path = require(`path`)
const hbs = require(`hbs`)
const geoCode = require(`./utills/geocode.js`)
const forecast = require(`./utills/forecast.js`)

const app = express()
const port = process.env.PORT || 4200

const publicDiractoryPath = path.join(__dirname,`../public`)
const viewPath = path.join(__dirname,`../templates/views`)
const partialPath = path.join(__dirname,`../templates/partials`)


app.set(`view engine`,`hbs`)
app.set(`views` , viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDiractoryPath))

app.get(`` , (req,res) => {
    res.render(`index`,{
        title: `Weather`,
        name: `Rishi`
    })
})

app.get(`/about` , (req,res) => {
    res.render(`about`, {
        title:`Your lie in April`,
        name: `TOEI Animation`
    })
})

app.get(`/help` , (req,res)=> { 
    res.render(`help` , {
    title: `Help`,
    msg: `Type your query`,
    name: `Rishi`
})
})

app.get(`/weather`, (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: `You must provide an address`
        })
    } 
    geoCode(req.query.address,(error , {latitude , longitude ,location} = {}) => {
        if(error) {
            return res.send({error })
        } 
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.setDefaultEncoding({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get(`/products` , (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: `You must provide a search term`
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get(`/help/*` , (req,res) => {
    res.render(`404` , {
        title: `404`,
        name: `Rishi`,
        errorMessage: `Help Page not Found`
    })
})

app.get(`*` , (req,res) => {
    res.render(`404` , {
        title: `404`,
        name: `Rishi`,
        errorMessage: `Page Not Found`
    })
})

app.listen(port,() => {
    console.log(`App is running on port 4200`)
})