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
    classes:[{
        type:Schema.ObjectId,
        ref:'Class'
    }],
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
    videoList:[{
        type:Schema.ObjectId,
        ref:'Video'
    }]
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

module.exports = mongoose.model('Task',TaskSchema);
module.exports = mongoose.model('Student',StudentSchema);
module.exports = mongoose.model('Class',ClassSchema);
module.exports = mongoose.model('Video',VideoSchema);
