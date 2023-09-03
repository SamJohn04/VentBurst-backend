const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Post', postSchema)