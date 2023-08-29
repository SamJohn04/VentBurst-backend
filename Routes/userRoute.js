const express = require('express')

const { userSignup, userLogin, searchUser } = require('../Controllers/userController')
const { chatMessage, chatHistory } = require('../Controllers/chatController')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()


router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/chat', protect, chatMessage)
router.get('/myVent/:id', protect, chatHistory)


module.exports = router