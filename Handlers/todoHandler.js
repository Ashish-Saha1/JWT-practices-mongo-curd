const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");

const Todo = require("../Schema/todoSchema")
const User = require("../Schema/userSchema")
const checkLoggedIn = require('../Middleware/checkLoggedIn');


//Instanse Method Example

route.get("/activeTodo", async (req,res)=>{
    try {
       const todo = new Todo()
        const data = await todo.findActive() 
        res.status(200).json({Message: data })
      } catch (error) {
        console.log(error);
        
          res.status(500).json({Errorget: error })
      }
})



route.get("/:id", async (req,res)=>{
    try {
       const getTodo = await Todo.find({_id: req.params.id})
          res.status(200).json({Message: getTodo })
      } catch (error) {
          res.status(500).json({Errorget: error })
      }
})


route.get("/", checkLoggedIn, async (req,res)=>{
    try {
        const getAllTodo = await Todo.find()
           res.status(200).json({Message: getAllTodo })
       } catch (error) {
           res.status(500).json({ErrorGetAll: error })  
       }
})


route.post("/", checkLoggedIn, async (req,res)=>{
    
    try {
    const todo = new Todo(
        {...req.body,
            user: req.userId}
        );
    
    const savedTodo = await todo.save()
       await User.updateOne(
        {_id: req.userId}, 
        {$push:{todo: savedTodo._id}}
    )
        res.status(200).json({Message: "Todo inserted Successfully" })
    } catch (error) {
        res.status(500).json({ErrorIs: error.message })
    }
})

route.post("/all", async (req,res)=>{
    try {
      await  Todo.insertMany(req.body)
        res.status(200).json({Message: "Todos were inserted Successfully" })
    } catch (error) {
        res.status(500).json({ErrorIs: error })
    }
    
})

// route.put("/:id", async (req,res)=>{
//     try {
//         await  Todo.updateOne({_id: req.params.id},{$set:{
//             title : 'Sukanta'
//         }})
//           res.status(200).json({Message: "Todo updated" })
//       } catch (error) {
//           res.status(500).json({ErrorIs: error })
//       }
// })

route.put("/:id", async (req,res)=>{
    try {
        const updateData = req.body
        await  Todo.updateOne({_id: req.params.id},{$set: updateData})
          res.status(200).json({Message: "Todo updated" })
      } catch (error) {
          res.status(500).json({ErrorIs: error })
      }
})



route.put("/all", async (req,res)=>{
    try {
        await  Todo.updateMany({status: "active"},{$set:{
            description : 'MERN'
        }})
          res.status(200).json({Message: "Todos were updated" })
      } catch (error) {
          res.status(500).json({ErrorIs: error.message })
      }
})

route.delete("/:id", async(req,res)=>{
    try {
        await  Todo.deleteOne(req.body)
          res.status(200).json({Message: "Todo was deleted Successfully" })
      } catch (error) {
          res.status(500).json({ErrorDel: error })
      }
})

route.delete("/all", async(req,res)=>{
    res.send("Welcome to Route method get")
})

module.exports = route;