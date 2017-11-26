'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

const StudentSchema = new Schema({
    // username:{
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    languages: {
        type: [{        //Todo verify array type mongo
            type: String,
            enum: ['en', 'fr', 'es', 'it', 'zh']
        }],
        default: ['es']
    },
    googleId: {
        type: String,
        unique: true
    },
    isLoggedIn: Boolean,
    likes: [{
        type:Schema.ObjectId,
        ref:'Video'
    }],
    dislikes: [{
        type:Schema.ObjectId,
        ref:'Video'
    }]
});

const ClassSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    videoList:[Number]
});

const VideoSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    thumbnailUrl:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tasks',TaskSchema);
module.exports = mongoose.model('Students',StudentSchema);
module.exports = mongoose.model('Classes',ClassSchema);
module.exports = mongoose.model('Videos',VideoSchema);

