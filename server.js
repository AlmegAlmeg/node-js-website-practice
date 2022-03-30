const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./DB/dbConnection')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.SERVER_URL || 5000
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

const usersRouter = require('./routes/users')
const adsRouter = require('./routes/ads')

app.use('/api/users', usersRouter)
app.use('/api/ads', adsRouter)

module.exports = app