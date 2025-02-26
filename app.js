const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongooseConnection = require('./config/mongooseConnection')
const teamRouter = require('./routes/teamRouter')
const flagRouter = require('./routes/flagRouter')
require('dotenv').config()
const cors =require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HELLO")
})
app.use('/team',teamRouter)
app.use('/flag',flagRouter)

app.listen(5000)