const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(()=> console.log('Connected to database'))
    .catch(err => console.error('Error! ' + err))