const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')
const app = express()
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const mainRoute = require('./routes/main')
const addRoute = require('./routes/add')
const coursesRoute = require('./routes/courses')
const cardRoute = require('./routes/card')

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', mainRoute)
app.use('/add', addRoute)
app.use('/courses', coursesRoute) 
app.use('/card', cardRoute) 

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = 'mongodb+srv://valentin:udE9sxIO2evEsv6Y@cluster0-y4ews.mongodb.net/shop?retryWrites=true&w=majority'

    await mongoose.connect(url, {useNewUrlParser: true})

    app.listen(PORT, () => {
      console.log(`Server is started on port: ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()