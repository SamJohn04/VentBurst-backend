const Post = require('../Models/postModel')
const asyncHandler = require('express-async-handler')

const createPost = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content) {
        res.status(400).json({message: "Field is empty!"})
    }

    const newChat = {
        sender: req.user._id,
        content,
    };

    try {
        let message = await Post.create(newChat);

        message = await message.populate("sender")

        res.status(201).json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})


const postHistory = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    try {
        const chatVent = await Post.find({sender: userId}).sort({ timestamp: -1 }).limit(10);
        return res.json(chatVent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
})


module.exports = { createPost, postHistory }