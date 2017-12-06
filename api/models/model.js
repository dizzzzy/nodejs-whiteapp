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
    classes:[Schema.Types.Mixed] //object of class with name and id and within a list of likes of object video with name and id
    // likes: [{type: Schema.Types.Mixed }], //object of video with name and id
});

const ClassSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    videoList:[Schema.Types.Mixed] //object of video id and number of likes
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
