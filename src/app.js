import express from "express"
import {forecast} from '../public/js/forecast.js'
import {geocode} from '../public/js/geocode.js'
import path from 'path'
import hbs from 'hbs'

const app = express()

console.log(path.resolve())
//console.log(path.join(path.resolve(),'../public'))

// Define paths for express config
const publicPathDir = path.join(path.resolve(), '/public')
const viewsPath = path.join(path.resolve(),'/templates/views')
const partialsPath = path.join(path.resolve(),'/templates/partials')
// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicPathDir))

// app.get('', (req, res) => {
//    res.send('This is a dummy page')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index shit',
        message : 'In Index',
        author: 'Yeshi'  
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'What is this shit',
        message : 'Go fuck urself' ,
        author: 'Yeshi' 
    })
})

app.get('/weather', (req, res) => {
    if(! req.query.address){
        return res.send('Address is mandatory')
    }
    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send('Please provide a valid address')
        }
        forecast(lattitude,longitude, (error, data) => {
            if(error){
                return res.send('Unable to connect to forecast api. Please check network connection')
            }
            data['location'] = location
            res.send(data)
      })
    })
    
})

app.get('*', (req,res) => {
    res.render('error', {
        message : 'No such page moron',
        title: 'This is a error page',
        author: 'Yeshi' 
    })
})

app.listen(3000, () => {
    console.log(' Server started at port 3000 ')
})