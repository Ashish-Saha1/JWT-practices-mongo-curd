const express = require("express");
const mongoose = require("mongoose");
const app = express();
const todoHandler = require('./Handlers/todoHandler')
const userHandler = require('./Handlers/userHandler')
// const Todo = require("./Schema/todoSchema")

//Database Connect
mongoose.connect("mongodb://localhost:27017/todos")
.then(()=>console.log('Database connect successfully'))
.catch((err)=>console.log(`Error: ${err}`))

//Parse Data
    app.use(express.json())


// Route Handler
app.use('/todo', todoHandler)
app.use('/user', userHandler)

//Home Route
app.get('/home',(req,res)=>{
    res.send("Welcome to Home Route")
})


const defaultErrorHandler = function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({"Err":err})
}

app.use(defaultErrorHandler)

app.listen(3000, ()=>console.log('Listing on port 3000'))