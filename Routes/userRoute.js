const express = require('express')

const { userSignup, userLogin } = require('../Controllers/userController')
const { createPost, postHistory } = require('../Controllers/postController')
const { createComment, allComment } = require('../Controllers/commentController')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()


router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/post', protect, createPost)
router.get('/myVent/:id', protect, postHistory)
router.post('/post/:postId/comments', protect, createComment)
router.post('/post/:postId/comments/:commentId', protect, createComment)
router.get('/comments', protect, allComment)


module.exports = router