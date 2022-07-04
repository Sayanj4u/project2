const mongoose = require('mongoose');
const express = require('express');


const router = express.Router();

let ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
        
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    collegeId: {
        type: ObjectId,
        required: true,
        trim: true,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
  

}, { timestamps: true });



module.exports = mongoose.model('Intern', internSchema)