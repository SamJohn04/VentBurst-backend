const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const userSignup = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email, !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({message: "User already exist, proceed to Login."})
    }

    const hashedPassword = bcrypt.hashSync(password, 10)


    const newUser = new User ({
        email,
        password:hashedPassword,
    })


    try {
        await newUser.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({message: "Successfully Signup", newUser})   
})


const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        return res.status(400).json({message: "User does not exist, proceed to Signup first!"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect Email/Password"})
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    console.log("Generated Token:", token)

    return res.status(200).json({message: "User successfully Logged in", existingUser, token})
})




module.exports = { userSignup, userLogin }