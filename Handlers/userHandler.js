const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Todo = require("../Schema/todoSchema")
const User = require("../Schema/userSchema")




route.post("/sign-up", async (req,res)=>{
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10) 
        const body = {
            name : req.body.name,
            userName : req.body.userName,
            password : hashedPass,
            status: req.body.status
        }
        const user = new User(body)
        const data = await user.save()
        res.status(200).json({Mess: "User Sign UP Success", Data: data})
    } catch (error) {
        res.status(500).json({ErrorMess: error})
    }
})


route.post("/sign-in", async (req,res)=>{
    try {
        const user = await User.findOne({userName: req.body.userName})
        if(user){

        }else{
            
        }



        //res.status(200).json({user:user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ErrorMess: error})
    }
})



module.exports = route;