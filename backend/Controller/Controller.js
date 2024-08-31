const asyncHandler = require("express-async-handler");
const user = require('../Model/Model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
        res.status(400).json("all fields are mandatory")
    }
    
    const userAvailable = await user.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashedPassword);
    const User = await user.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: User.id, email: User.email });
    }
    else {
        res.status(400);
        throw new Error("user data us not valid")
    }
    res.json({ message: "register the user" })
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password, rememberMe } = req.body; // Get the rememberMe value from the request body
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    const loginUser = await user.findOne({ email });
    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
       
        const tokenExpiry = rememberMe ? '30d' : '15m';

        const accesstoken = jwt.sign(
            {
                user: {
                    username: loginUser.username,
                    email: loginUser.email,
                    id: loginUser.id,
                },
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: tokenExpiry,
            }
        );

      
        res.cookie('accessToken', accesstoken, {
            httpOnly: true, 
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
        });

        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, loginUser}