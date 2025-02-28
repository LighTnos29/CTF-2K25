const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongooseConnection = require('./config/mongooseConnection')
const teamRouter = require('./routes/teamRouter')
const flagRouter = require('./routes/flagRouter')
const gameRouter = require('./routes/gameRouter')
require('dotenv').config()
const cors =require('cors')
const leaderboardRouter = require("./routes/leaderboardRouter")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',  // Your Angular app's origin
    credentials: true,                // Important for withCredentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.get("/",(req,res)=>{
    res.send("HELLO")
})
app.use('/team',teamRouter)
app.use('/flag',flagRouter)
app.use('/leaderboard',leaderboardRouter)
app.use('/gamestatus',gameRouter)

const PORT = process.env.PORT || 5000

app.listen(5000)