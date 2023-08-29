const Chat = require('../Models/chatModel')
const asyncHandler = require('express-async-handler')

const chatMessage = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content) {
        res.status(401).json({message: "Field is empty!"})
    }

    const newChat = {
        sender: req.user._id,
        content,
    };

    try {
        let message = await Chat.create(newChat);

        message = await message.populate("sender")

        res.status(201).json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})


const chatHistory = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    try {
        const chatVent = await Chat.find({sender: userId}).sort({ timestamps: -1 }).limit(10);
        res.json(chatVent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
})


module.exports = { chatMessage, chatHistory }