require('dotenv').config({
    path: '.env',
})
const Application = require('./app/service')
const Port = process.env.NODE_ENV === 'production' ? 3000 : process.env.PORT
const DB_URL = process.env.MONGO_URL

new Application(Port, DB_URL)
