const express = require('express')

const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./Routes/index')
const loginRouter = require('./Routes/login')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use('/', indexRouter)
app.use('/login', loginRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`I am listening on http://localhost:3000`)
})