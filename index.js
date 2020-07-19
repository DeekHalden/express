const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const { handleNotFound } = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/admin', adminRoutes({ router }))
app.use(shopRoutes({ router }))

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(handleNotFound)

app.listen(3000)