const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel');



const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
        res.status(400).json({ message: "User Already Exists" });
    } else {
        const newUser = await User.create({
            name,
            email,
            password,
            picture,
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id)
            });
        } else {
            res.status(500).json({ message: "Unable to Create user" });
        }
    }
});


const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)

        });
    } else {
        res.status(404).json({ message: "Authentication failed" });
    }
});


module.exports = {
    registerUser,
    authUser,
};

