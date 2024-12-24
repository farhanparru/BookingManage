const express = require('express')
const app = express()
require('dotenv').config()  
const cors = require('cors')
const BookRouter = require('../Backend/router/BookmarkRouter')
const mongoose = require('mongoose')  
const PORT = 9000

   
app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["GET,POST,PUT,DELETE,PATCH"],
  
  }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/',(req,res)=>{
    res.send('My bookmark managment Application')
})

 

mongoose.connect(process.env.MONGODB_UR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


  // midllware

  app.use('/api/Books/', BookRouter)



app.listen(PORT,()=>{
    console.log(`server is Runing http://localhost:${PORT}`);
    
})