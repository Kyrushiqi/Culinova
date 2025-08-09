const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
}

//Register Endpoint
const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //Checks if username was entered
        if (!username) {
            return res.json({
                error: 'Username is required'
            });
        };

        //Checks if email was entered
        if (!email) {
            return res.json({
                error: 'Email is required'
            });
        }
        //Makes sure the email contains an @ and . to ensure that it's a valid email
        if (!email.includes('@') || !email.includes('.')) {
            return res.json({
                error: 'Please enter a valid email address'
            });
        }

        //Checks if a password was entered and it's at least 6 characters
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            });
        };

        //Checks to see if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password)

        //Create user in the database
        const user = await User.create({
            name: username, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        
        //Check if users exist
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        //Check if passwords match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if (!match){
            res.json({
                error: "Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }
    else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.cookie('token', '').json('Logout successful');
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}