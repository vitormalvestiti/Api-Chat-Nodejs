const express = require('express')
const bodyParser = require('body-parser')
const msgRoute = require('./routes/msgRoute')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }))
msgRoute(app)
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('OK'))

app.listen(port, () => console.log('API START OK'))