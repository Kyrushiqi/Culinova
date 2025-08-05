const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')

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
                error: 'username is required'
            })
        };
        //Check if password is good
        if (!password || password < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)

        //Create user in the database
        const user = await User.create({
            username, 
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
            res.json('passwords match')
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

module.exports = {
    test,
    registerUser,
    loginUser
}