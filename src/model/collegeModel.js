const mongoose = require('mongoose');
const express = require('express');



const router = express.Router();
const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    logoLink:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
 

}, { timestamps: true });



module.exports = mongoose.model('College', collegeSchema)