const express = require("express");
const mongoose = require("mongoose");


const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['active','inactive']
    },

    date : {
        type: Date,
        default: Date.now
    }
})


todoSchema.methods = {
    findActive: function(){
        return mongoose.model('Todo').find({status: 'active'})
    }
}

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo;
