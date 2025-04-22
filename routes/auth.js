const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');

// Register 
router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const userExits = await User.findOne({email});
        if(userExits)  return res.status(400).json({message:"User already exists"});

        const newUser = await User.create({username, email, password});
        res.status(201).json({message:'User created successfully'})
    } catch(error){
        res.status(500).json({message:error.message})
    }
});



//Login 
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({message:"Invalid email or password"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: '30D'});

        res.json({ message: 'Login Successful', token })
    } catch(error){
        res.status(500).json({message:error.message})
    }
})





module.exports = router;