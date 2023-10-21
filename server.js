const  express  = require("express");
const notes = require('./data/notes')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const connectdb = require('./db/db')
connectdb()
app.use(cors())
app.use(express.json())
require('dotenv').config();


app.get('/',(req,res)=>{
    res.send('API is Running.....')
})





app.use('/api/users',userRoutes)
app.use('/api/notes',noteRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server Started on Port ${PORT}`));