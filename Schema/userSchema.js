const express = require("express");
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['active','inactive']
    },

    todo:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
})


const User = mongoose.model('User', userSchema)
module.exports = User;
