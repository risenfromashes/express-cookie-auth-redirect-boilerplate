const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser('Ablabpabamha45'))

const server = app.listen(80, () => console.log('Connected to port 80'))
app.use(bodyParser.json({
    extended: true
}))

app.get('/', (req, res) => {
    let authCookie = req.cookies.auth
    if (authCookie && authCookie === 'access') {
        res.sendFile(path.resolve('./index.html'))
    } else {
        res.redirect('/getAuth')
    }
})

app.get('/getAuth', (req, res) => {
    let authCookie = req.cookies.auth
    if (authCookie && authCookie === 'access') res.sendFile(path.resolve('./index.html'))
    else res.sendFile(path.resolve('./auth.html'))
})

app.post('/getAuth', (req, res) => {
    if (!req.body.password) return
    if (req.body.password === 'IFuckYou') {
        console.log('trying to set cookie')
        res.cookie('auth', 'access', {
            httpOnly: true
        })
        res.sendStatus(200)
    } else res.sendStatus(406)
})