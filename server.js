const express = require('express')
const cors = require('cors')
// const morgan = require('morgan')
require('dotenv').config()
require('./DB/dbConnection')
const app = express()

app.use(cors())
app.use(express.json())
// app.use(morgan(':mothod :url :status :response-time ms'))

const PORT = process.env.SERVER_URL || 5000
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

const usersRouter = require('./routes/users')

app.use('/api/users', usersRouter)

module.exports = app