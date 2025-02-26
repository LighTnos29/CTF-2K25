const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongooseConnection = require('./config/mongooseConnection')
const teamRouter = require('./routes/teamRouter')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("HELLO")
})
app.use('/team',teamRouter)

app.listen(5000)