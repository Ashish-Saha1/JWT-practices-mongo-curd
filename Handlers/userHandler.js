const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const Todo = require("../Schema/todoSchema")
const User = require("../Schema/userSchema")
        require('dotenv').config()



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
        const isInvalidPassword = await bcrypt.compare(req.body.password, user.password)
           if(isInvalidPassword){
            const token = await jwt.sign({ userName: user.userName, userId: user._id }, process.env.JWT_KEY, {expiresIn: "2 days"});

            res.status(200).json({Mess: "Token generated", token: token})
           }else{
            res.status(401).json({ErrorMess: "Authentication Faliure"})
           }
        }else{
            res.status(401).json({ErrorMess: "Authentication Faliure"})
        }



        //res.status(200).json({user:user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ErrorMess: error})
    }
})

route.get('/', async (req,res)=>{
    try {
        const getAllUser = await User.find()
         .populate("todo")
            res.status(200).json({Message: getAllUser })
        } catch (error) {
         console.log(error);
         
            res.status(500).json({ErrorGetAll: error })  
        }
})



module.exports = route;