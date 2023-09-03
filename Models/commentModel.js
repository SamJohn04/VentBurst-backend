const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
    },
    parentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
})



module.exports = mongoose.model('Comment', commentSchema)