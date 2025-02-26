const mongoose = require('mongoose')
const config = require('config')
const debug = require('debug')("development:mongooseConnection")

mongoose
.connect(`${config.get("MONGODB_URI")}/cft`)
.then(function() {
    debug("Connected to mongodb")
})
.catch(function (err) {
    debug(err)
})