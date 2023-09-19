const asyncHandler = require('express-async-handler')
const Comment = require('../Models/commentModel')


const createComment = asyncHandler(async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({message: "Field is empty!"})
        }

        const newComment = new Comment({
            author: req.user._id,
            content,
            parentPost: req.params.postId,
            parentComment: req.params.commentId,
        })

        io.emit('newComment', newComment);
        
        const savedComment = await newComment.save()

        return res.status(201).json(savedComment)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


const allComment = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find().exec()

        return res.status(200).json(comments)

    } catch (error) {
        return res.status(400).json({ error: error.message})
    }
})



module.exports = { createComment, allComment }