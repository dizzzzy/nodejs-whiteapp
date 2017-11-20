'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    Created_date: {
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
    username:{
        type: String,
        required: true,
        unique: true
    },
    languages: {
        type: [{        //Todo verify array type mongo
            type: String,
            enum: ['english', 'french', 'spanish', 'mandarin']
        }],
        default: ['english']
    },
    oauth_account: String,
    is_logged_in: Boolean,
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
    video_list:[Number]
});

const VideoSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    thumbnail_url:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tasks',TaskSchema);
module.exports = mongoose.model('Student',StudentSchema);
module.exports = mongoose.model('Class',ClassSchema);
module.exports = mongoose.model('Video',VideoSchema);

