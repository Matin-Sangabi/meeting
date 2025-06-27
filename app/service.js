const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const createError = require('http-errors')
const path = require('path')

const { routes } = require('./routes/routes')

class Application {
    #app = express()
    #DB_URL
    #PORT

    constructor(PORT, DB_URL) {
        this.#PORT = PORT
        this.#DB_URL = DB_URL
        this.configApplication()
        this.connectDB()
        this.corsConfig()
        this.createRouter()
        this.createServer()
        this.errorHandling()
    }

    configApplication() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }))
        this.#app.use(express.static(path.join(__dirname, 'public')))
    }

    corsConfig() {
        const corsOptions = {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
        this.#app.use(cors(corsOptions))
    }

    async connectDB() {
        try {
            await mongoose.connect(this.#DB_URL)
            console.log('DB connected successfully')
        } catch (error) {
            console.log('DB connection failed ! ', error?.message)
        }
    }

    async createServer() {
        const http = require('http')
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`)
        })
    }

    createRouter() {
        this.#app.use('/api/v1', routes)
    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Not Found'))
        })

        /* eslint-disable-next-line no-unused-vars */
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError('Server Error')
            const statusCode = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(statusCode).json({
                error: {
                    statusCode,
                    message,
                },
            })
        })
    }
}

module.exports = Application
